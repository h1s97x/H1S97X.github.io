---
title: 验证码破解入门（三）：滑块验证码的缺口定位与轨迹生成
description: "滑块验证码有两关：算出缺口位置，以及让轨迹看起来像人。这篇讲清 ddddocr 检测、OpenCV 模板匹配与边缘检测三种定缺口方式，以及贝塞尔轨迹、过冲回退、ghost-cursor 的实战写法。"
tags: [安全, Python, 爬虫, 验证码, 逆向]
published: 2026-10-15T12:00:00+08:00
updated: 2026-10-15T12:00:00+08:00
category: 技术
notebook: notes
---


滑块验证码是目前最主流的一类。往前翻几年还是"输入四个数字"，现在连小网站都上滑块了——因为它同时考两件事：**你能不能算出缺口在哪**，以及**你能不能滑得像人**。

很多人卡在第二关。第一关识别出缺口位置，代码一跑，匀速直线滑过去，服务端直接返回"验证失败"。这篇把两关都讲透。

## 一、先看清滑块在考什么

一道完整的滑块验证，服务端至少看三样东西：

1. **缺口位置对不对** —— 你最后停在哪，是不是真的缺口处
2. **轨迹像不像人** —— 中间的点位、时间、加速度分布
3. **环境像不像人** —— 设备指纹、请求头、是否有真实浏览器特征

第 1 条靠图像算法，第 2 条靠轨迹生成，第 3 条靠浏览器环境。三条全过才给通过。**先明确是哪一条挂了，再去修**，否则容易在错误的方向上耗一整天。

判断方法：在浏览器里手动滑一次，看是否能通过。能过说明第 3 条没问题；把你的轨迹画出来跟真人轨迹对比，就能判断是不是第 2 条的问题。

## 二、第一关：算出缺口位置

### 方式一：ddddocr 目标检测（最省事）

ddddocr 除了认字符，还能做目标检测，直接给出缺口坐标：

```python
import ddddocr
import requests

det = ddddocr.DdddOcr(det=True, show_ad=False)

bg_bytes = requests.get("https://example.com/bg.jpg").content
result = det.detection(bg_bytes)

for box in result:
    x1, y1, x2, y2 = box
    print(f"缺口: x={x1}, y={y1}, w={x2 - x1}, h={y2 - y1}")
```

`detection()` 返回的是**边界框列表**，通常只有一个（缺口），取 `x1` 就是横向距离。

**几个坑**：

- 坐标是**图片上的像素**，不是页面上的像素。如果图片被 CSS 缩放过，必须换算，否则滑多少都不对。
- ddddocr 的检测模型对"缺口有明显的形状特征"的图效果好。如果缺口被做成了透明/半透明、或者背景特别花，检测会失败。
- 传入的必须是完整的背景图 bytes，**不要把滑块拼图也传进去**。

### 方式二：OpenCV 模板匹配（有滑块图时最准）

如果站点把"滑块拼图"单独发给你了，那模板匹配就是最优解——因为你有完整的模板。

```python
import cv2
import numpy as np
import requests

def imread_from_url(url):
    arr = np.frombuffer(requests.get(url).content, np.uint8)
    return cv2.imdecode(arr, cv2.IMREAD_COLOR)

bg = imread_from_url("https://example.com/bg.jpg")
slider = imread_from_url("https://example.com/slider.png")

bg_gray = cv2.cvtColor(bg, cv2.COLOR_BGR2GRAY)
slider_gray = cv2.cvtColor(slider, cv2.COLOR_BGR2GRAY)

# 用边缘而不是灰度做匹配，对背景颜色变化更鲁棒
bg_edges = cv2.Canny(bg_gray, 100, 200)
slider_edges = cv2.Canny(slider_gray, 100, 200)

result = cv2.matchTemplate(bg_edges, slider_edges, cv2.TM_CCOEFF_NORMED)
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

gap_x = max_loc[0]
print(f"缺口 x={gap_x}, 置信度={max_val:.3f}")
```

**为什么用 Canny 边缘而不是直接灰度？**

因为滑块拼图的颜色和缺口处的背景颜色通常不一致。直接灰度匹配会去比颜色，反而找到错误位置。**边缘只关心形状，不受颜色影响**，鲁棒性好得多。

### 方式三：纯边缘检测（没有滑块图时）

有些站点只返回背景图（缺口是"画"在背景图上的），这时滑块图可能内嵌在 DOM 里，也可能根本没有。做法是自己找"这个区域边缘密度异常"：

```python
import cv2
import numpy as np

def find_gap_by_edges(bg_img, gap_width=50):
    gray = cv2.cvtColor(bg_img, cv2.COLOR_BGR2GRAY)

    # 高斯模糊压掉背景纹理
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # 边缘检测
    edges = cv2.Canny(blurred, 50, 150)

    # 形态学膨胀，让缺口轮廓连成整体
    kernel = np.ones((3, 3), np.uint8)
    edges = cv2.dilate(edges, kernel, iterations=2)

    # 统计每列的边缘像素数量，缺口列会明显偏高
    col_sum = edges.sum(axis=0)

    # 从左侧 1/3 之后开始找峰值（缺口不会在最左边）
    start = len(col_sum) // 3
    gap_x = int(np.argmax(col_sum[start:]) + start)

    return gap_x
```

这个方法不通用，**只适合缺口特征明显（有明显的白色/灰色轮廓）的站点**。实际用的时候配合 `cv2.imshow` 把结果画出来看一眼，比盲调参数有效得多：

```python
vis = bg_img.copy()
cv2.rectangle(vis, (gap_x, 0), (gap_x + gap_width, bg_img.shape[0]), (0, 0, 255), 2)
cv2.imwrite("debug.png", vis)
```

### 别忘了缩放换算

如果背景图的原始宽度是 300px，但页面上显示成 260px，那么：

```python
scale = display_width / natural_width   # 260 / 300
real_distance = gap_x * scale
```

**这一步错了，后面轨迹做得再真也没用。** 用浏览器的 `naturalWidth` 和 `clientWidth` 算，别用截图量。

## 三、第二关：轨迹生成

### 为什么匀速直线一定不过

真人拖动滑块时，速度曲线是"加速—匀速—减速"，还带微小的纵向抖动和偶尔的过冲回调。匀速直线在服务端的加速度分布图里是一条平线，**特征太干净了，干净本身就是异常**。

### 贝塞尔曲线版轨迹

思路是分三段：加速段、匀速段、减速段，每段的位移量用不同缓动函数计算。

```python
import random

def ease_in_quad(x):
    return x ** 2

def ease_out_quad(x):
    return 1 - (1 - x) ** 2

def ease_out_back(x):
    c1 = 1.70158
    c3 = c1 + 1
    return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2


def gen_trajectory(distance, overshoot=True):
    """生成 (x, y, t) 轨迹点"""
    points = []
    total = distance + random.randint(8, 15) if overshoot else distance
    t = 0
    cur = 0.0

    # 第一阶段：加速（占 30%）
    while cur < total * 0.3:
        t += random.randint(10, 20)
        ratio = cur / (total * 0.3)
        cur += ease_in_quad(ratio) * 6 + random.uniform(0.5, 2.5)
        points.append((round(cur, 2), random.randint(-2, 2), t))

    # 第二阶段：匀速（占 40%）
    while cur < total * 0.7:
        t += random.randint(12, 18)
        cur += random.uniform(3, 6)
        points.append((round(cur, 2), random.randint(-3, 3), t))

    # 第三阶段：减速（剩余 30%）
    decel_start = cur
    while cur < total:
        t += random.randint(15, 25)
        ratio = (cur - decel_start) / max(total - decel_start, 1)
        cur += (1 - ease_out_quad(ratio)) * 4 + random.uniform(0.3, 1.2)
        points.append((round(cur, 2), random.randint(-2, 2), t))

    # 过冲回退：滑过头再拉回来，这是很典型的人类行为
    if overshoot:
        while cur > distance:
            t += random.randint(15, 30)
            cur -= random.uniform(0.8, 2.5)
            points.append((round(max(cur, distance), 2),
                           random.randint(-1, 1), t))
        points.append((distance, 0, t + random.randint(10, 30)))

    return points
```

几个关键设计：

- **时间间隔逐步变大**：加速段 10–20ms，减速段 15–25ms。人的操作越到后面越谨慎。
- **y 轴抖动**：真人手会抖，但幅度很小（±3px 以内）。抖太夸张反而假。
- **过冲回退**：50% 左右的人会滑过头再回拉一点。加上这个特征能明显提升通过率。
- **不要按"次数"取点，按"距离"循环**：这样无论距离多长，点的密度都合理。

### 真实轨迹采集与重放

比生成更稳的一条路：**录真人的轨迹，建库，随机挑一条缩放使用**。

浏览器控制台里跑这段，滑一次就录一条：

```javascript
let traj = [];
let start = null;

document.addEventListener("mousedown", (e) => {
    if (!e.target.className.includes("slide")) return;
    start = Date.now();
    traj = [];
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
});

function onMove(e) {
    if (start) traj.push({ x: e.clientX, y: e.clientY, t: Date.now() - start });
}

function onUp() {
    console.log(JSON.stringify(traj));
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    start = null;
}
```

录 20–30 条存成 JSON，重放时按目标距离缩放：

```python
import json
import random

def scale_trajectory(traj, target_distance):
    """把录下来的轨迹缩放到目标距离"""
    base_x = traj[0]["x"]
    origin_distance = traj[-1]["x"] - base_x
    if origin_distance == 0:
        return []

    ratio = target_distance / origin_distance
    scaled = []
    for p in traj:
        scaled.append({
            "x": round((p["x"] - base_x) * ratio, 2),
            "y": p["y"] - traj[0]["y"],
            "t": p["t"],
        })
    return scaled


with open("trajectories.json", encoding="utf-8") as f:
    library = json.load(f)

traj = scale_trajectory(random.choice(library), gap_x)
```

**注意**：不要每次都用同一条。要随机选、要对时间轴做轻微缩放（比如整体 ±10%），否则重复轨迹会触发重放检测。

### ghost-cursor：省掉自己造轮子

Puppeteer 生态里有个成熟的库专门干这个：[ghost-cursor](https://github.com/Xetera/ghost-cursor)。它内置了贝塞尔曲线 + 随机抖动，还能直接跑 `humanMove`。

```bash
npm install ghost-cursor puppeteer
```

```javascript
const puppeteer = require("puppeteer");
const { createCursor } = require("ghost-cursor");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,   // 实战别开 headless
        args: ["--disable-blink-features=AutomationControlled"],
    });
    const page = await browser.newPage();
    await page.goto("https://example.com/captcha");

    const cursor = createCursor(page);

    // 1. 先移到滑块上，再按下
    const slider = await page.$(".slider-btn");
    const box = await slider.boundingBox();
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    await cursor.moveTo({ x: startX, y: startY });
    await page.mouse.down();

    // 2. 目标位置（缺口 x + 页面偏移）
    const targetX = startX + gapDistance;

    // 3. humanMove 会自己生成加速-减速曲线
    await cursor.moveTo(
        { x: targetX, y: startY },
        { jitter: 2, waitForSelector: false, paddingPercentage: 5 }
    );

    // 4. 停下、微调、松开
    await page.waitForTimeout(120 + Math.random() * 180);
    await page.mouse.up();

    await browser.close();
})();
```

`headless: false` 和 `--disable-blink-features=AutomationControlled` 很重要，后面第四篇会展开。

## 四、把两关拼起来

```python
import requests
import ddddocr
import time

class SliderSolver:
    def __init__(self):
        self.session = requests.Session()
        self.det = ddddocr.DdddOcr(det=True, show_ad=False)

    def solve(self):
        init = self.session.get("https://example.com/captcha/init").json()
        token = init["token"]

        bg = self.session.get(init["bg_url"]).content
        boxes = self.det.detection(bg)
        if not boxes:
            raise RuntimeError("缺口检测失败，可能需要换检测方式")

        gap_x = boxes[0][0]

        # 页面缩放换算（示例：图上 300px，页面显示 260px）
        display_ratio = init.get("display_width", 300) / init.get("natural_width", 300)
        distance = gap_x * display_ratio

        traj = gen_trajectory(distance)

        resp = self.session.post(
            "https://example.com/captcha/verify",
            json={"token": token, "trajectory": traj},
        )
        return resp.json()

    def run(self, retries=5):
        for i in range(retries):
            try:
                res = self.solve()
                if res.get("success"):
                    return res.get("ticket") or res.get("token")
                print(f"第 {i + 1} 次失败: {res.get('msg')}")
            except Exception as e:
                print(f"第 {i + 1} 次异常: {e}")
            time.sleep(1 + i * 0.5)   # 退避，别硬刚
        raise RuntimeError("滑块验证连续失败")
```

## 五、滑不过去怎么排查

按这个顺序查，**从最可能的开始**：

| 现象 | 最可能的原因 | 怎么验 |
| ---- | ------------ | ------ |
| 每次都滑到固定位置却失败 | 缺口位置算错 / 没做缩放换算 | 把检测结果画在图上存下来看 |
| 位置对但总是失败 | 轨迹太"干净" | 打印时间间隔和位移，看是不是均匀 |
| 偶尔成功一次 | 被行为分析判了 | 上真实浏览器，检查 `navigator.webdriver` |
| 一上来就失败 | 没有热身请求 / cookie 不对 | 先 GET 首页和验证码页再提交 |
| 重试几次后被封 | 频率过高 | 加重试间隔，换 IP |

**最有效的调试手段是把轨迹画出来**：

```python
import matplotlib.pyplot as plt

xs = [p[0] for p in traj]
ys = [p[1] for p in traj]
ts = [p[2] for p in traj]

plt.plot(ts, xs, marker=".")
plt.xlabel("time (ms)")
plt.ylabel("x offset")
plt.savefig("traj.png")
```

一条假的轨迹是平滑的直线；真人轨迹在加速段有明显的曲率，末段会有一小段回拉。对一眼就清楚了。

## 六、小结

- 滑块考三件事：缺口位置、轨迹自然度、浏览器环境，先定位是哪一条挂了
- 缺口定位优先用模板匹配（有滑块图）或 ddddocr 检测，别自己写边缘算法硬调
- **图片缩放换算是最容易忽略、也最致命的一步**
- 轨迹要加速-匀速-减速三段、带纵轴抖动、最好带过冲回退
- 录真人轨迹建库比纯生成更稳，但要注意随机化和时间轴抖动
- 调试的核心手段：把缺口位置和轨迹都画出来看一眼

下一篇讲点选验证码和行为验证，以及打码平台怎么接。

## 参考

- [ddddocr](https://github.com/sml2h3/ddddocr)
- [ghost-cursor](https://github.com/Xetera/ghost-cursor)
- [验证码 (CAPTCHA) 绕过 - 逆向工程 Cookbook](https://overkazaf.github.io/reverse_engineering/web/04-advanced-recipes/captcha_bypass/)
