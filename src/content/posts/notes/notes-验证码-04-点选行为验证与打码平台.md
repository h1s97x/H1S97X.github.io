---
title: 验证码破解入门（四）：点选、行为验证与打码平台
description: "点选验证码靠目标检测，行为验证码靠环境伪装，实在搞不定就交给打码平台。这一篇讲 YOLO 识别图文点选、reCAPTCHA/hCaptcha 的 token 获取、2Captcha 接入，以及成本核算的取舍思路。"
tags: [安全, Python, 爬虫, 验证码, 逆向]
published: 2026-10-15T13:00:00+08:00
updated: 2026-10-15T13:00:00+08:00
category: 技术
notebook: notes
---


前三篇讲了文字和滑块。这篇收尾，讲三类更"软"的验证：点选、行为验证，以及一条很多人不愿意承认但非常实用的路——**打码平台**。

## 一、点选验证码：本质是目标检测

"请依次点击图中的自行车"这类验证码，看起来比滑块难，但**技术上反而更清晰**：它是一个标准的计算机视觉任务——目标检测。

难点在两处：

1. 提示词是动态的（图里有车有树有广告牌，只有一类是你该点的）
2. 顺序也有要求（"依次点击红绿灯再点击消防栓"）

### 用 YOLO 做检测

YOLOv8 预训练模型就是在 COCO 数据集上训的，包含 80 类常见物体，覆盖了大部分点选验证码的目标类别。

```bash
pip install ultralytics
```

```python
from ultralytics import YOLO

model = YOLO("yolov8n.pt")   # n 是最小模型，速度优先

results = model("captcha.jpg")

# COCO 类别名 -> id 映射里，常见的几个
# 0: person        2: car        9: traffic light
# 11: stop sign    13: bench     15: cat        16: dog

for r in results:
    for box in r.boxes:
        cls_id = int(box.cls[0])
        conf = float(box.conf[0])
        name = model.names[cls_id]
        x, y, w, h = box.xywh[0].tolist()
        if conf > 0.4:
            print(f"{name} 中心=({x:.0f}, {y:.0f}) 置信度={conf:.2f}")
```

拿到中心坐标后，用真实浏览器点过去就行（记得点的时候也加入随机偏移和停留时间）。

### 提示词解析

提示词的来源有两种：

**情况一：明文写在响应里**

```python
tip = resp.json()["tip"]        # "请依次点击：自行车"
```

直接从中匹配关键词到 COCO 类名的映射表：

```python
CN2COCO = {
    "人": 0, "行人": 0,
    "汽车": 2, "车": 2, "轿车": 2,
    "红绿灯": 9, "信号灯": 9,
    "停车标志": 11,
    "长椅": 13, "椅子": 13,
    "猫": 15, "狗": 16,
}
```

**情况二：提示词也是图片**

有些站点把提示词也做成图片（防 OCR），这时要先对提示图做一次文字识别。ddddocr 或者 PaddleOCR 都能做，但中文识别需要额外模型：

```bash
pip install paddleocr paddlepaddle
```

```python
from paddleocr import PaddleOCR

ocr = PaddleOCR(use_angle_cls=True, lang="ch", show_log=False)
result = ocr.ocr("tip.png", cls=True)
tip = "".join(line[1][0] for line in result[0])
print(tip)   # "请依次点击自行车"
```

### 自训模型：什么时候值得

预训练模型对 COCO 的 80 类覆盖有限。如果目标站点的点选类别很"垂直"（比如全是家电图标、全是某类商品），YOLOv8 认不出来。

这时值得自训：

1. 用脚本抓 500–1000 张验证码图（记得处理频率限制）
2. 用 labelImg / Roboflow 标注
3. `YOLO("yolov8n.pt").train(data="data.yaml", epochs=100)`

**成本核算**：标注 1000 张图大概要 3–6 小时人工。如果你只是跑一次任务，这个时间不如直接上打码平台。**只有当你有长期、大流量需求时才值得自训。**

## 二、行为验证：这一关考的是"环境"

reCAPTCHA v3、阿里云无感、腾讯的免验证类方案，它们**没有交互动作**——用户什么都没点就通过了。这类验证判的是你的浏览器环境和历史行为。

### 判什么

| 维度 | 具体信号 |
| ---- | -------- |
| 浏览器指纹 | Canvas/WebGL/AudioContext 哈希、字体列表、插件列表 |
| 自动化特征 | `navigator.webdriver`、CDP 痕迹、缺失的 `chrome` 对象 |
| 网络环境 | IP 类型（机房/住宅）、IP 历史信誉、请求头顺序 |
| 行为时序 | 页面停留、鼠标移动、滚动、输入节奏 |
| 账号历史 | 该账号/设备此前的验证通过率 |

**核心结论：这一关没法靠"生成一条曲线"糊弄，必须让整套环境看起来是真人。**

### 最低成本的做法：真实浏览器 + 去自动化痕迹

```javascript
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const browser = await puppeteer.launch({
    headless: false,                      // 有头模式，别省这一步
    userDataDir: "./profile",             // 复用 profile，避免每次都像新设备
    args: [
        "--disable-blink-features=AutomationControlled",
        "--no-first-run",
        "--no-default-browser-check",
    ],
});
```

`puppeteer-extra-plugin-stealth` 帮你补了一堆东西：去掉 `navigator.webdriver`、伪造插件列表、修 WebGL 参数、补 `chrome.runtime`。

**但要注意**：Stealth 插件只能治"明显的自动化特征"，治不了 IP 信誉。**机房 IP 跑 reCAPTCHA v3 基本拿不到高分**，这时要么换住宅代理，要么老老实实打码。

### 手写检查清单

上线前自己过一遍这几项：

```javascript
await page.evaluate(() => ({
    webdriver: navigator.webdriver,                  // 应为 false/undefined
    languages: navigator.languages,                  // 应为 ["zh-CN", "zh", "en"]
    plugins: navigator.plugins.length,               // 应为非 0
    chrome: typeof window.chrome,                    // 应为 "object"
    deviceMemory: navigator.deviceMemory,            // 不应为 undefined
    hardwareConcurrency: navigator.hardwareConcurrency,
}));
```

任何一项明显异常，都足以让 v3 给你打低分。"我本地跑着能过"和"服务器上跑着能过"是两回事。

## 三、打码平台：理性的选择

到这里要说一句很多人不爱听的话：**大量生产环境的爬虫，最后都是靠打码平台收工的**。

不是因为技术不行，而是因为**成本算不过来**。你自己维护一套识别+轨迹+指纹伪装的方案，要持续跟进对方迭代；打码平台 1000 次 2–3 美元，10–30 秒返回，接口一个 SDK 搞定。**对绝大多数业务量级，平台是更优解。**

### 主流平台对比

| 平台 | 价格（约） | 支持类型 | 特点 |
| ---- | ---------- | -------- | ---- |
| 2Captcha | $2.99 / 1000 | 文字、reCAPTCHA、hCaptcha、GeeTest | 文档好，SDK 全 |
| Anti-Captcha | $2.00 / 1000 | 几乎全部 | 便宜，稳定性不错 |
| CapSolver | $0.80 / 1000 | reCAPTCHA、hCaptcha | 便宜的选项 |
| 超级鹰（国内） | ¥0.1–0.6 / 次 | 国内站点 | 中文站适配好 |
| 极验通（国内） | 按次 | 极验专用 | 极验针对性最强 |

**选型建议**：
- 打国外站（reCAPTCHA/hCaptcha）→ 2Captcha 或 CapSolver
- 打国内站（极验/易盾/自研）→ 超级鹰
- 量大想省钱 → Anti-Captcha，但要注意余额和并发限制

### 2Captcha 接入示例

```bash
pip install 2captcha-python
```

**文字验证码**：

```python
from twocaptcha import TwoCaptcha

solver = TwoCaptcha("YOUR_API_KEY")

result = solver.normal("captcha.png")
print(result["code"])      # "AB3CD"
```

**reCAPTCHA v2**：

```python
result = solver.recaptcha(
    sitekey="6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-",
    url="https://example.com/login",
)
token = result["code"]
```

拿到 token 后要塞进页面表单里：

```javascript
await page.evaluate((token) => {
    document.getElementById("g-recaptcha-response").value = token;
    // 有些站点还需要触发回调
    if (window.___grecaptcha_cfg) {
        // 视站点实现而定，可能需要调用页面的回调函数
    }
}, token);

await page.click("#submit");
```

**hCaptcha**：

```python
result = solver.hcaptcha(
    sitekey="10000000-ffff-ffff-ffff-000000000001",
    url="https://example.com",
)
```

**极验**：

```python
result = solver.geetest(
    gt="your_gt",
    challenge="your_challenge",
    url="https://example.com",
)
# {"challenge": "...", "validate": "...", "seccode": "..."}
```

注意 `geetest` 需要你先从页面抓当前的 `gt` 和 `challenge` —— 它们**每次都会变**，不能硬编码。

## 四、一个带降级的完整方案

工程上最稳的结构是**多级降级**：自研识别便宜但会失败，打码平台贵但稳，两层兜底。

```python
import ddddocr
from twocaptcha import TwoCaptcha

class CaptchaRouter:
    """先自研识别，失败再走打码平台"""

    def __init__(self, api_key=None):
        self.dddd = ddddocr.DdddOcr(show_ad=False)
        self.platform = TwoCaptcha(api_key) if api_key else None
        self.stats = {"local": 0, "platform": 0, "failed": 0}

    def solve_text(self, img_bytes):
        # 第一层：本地识别
        try:
            code = self.dddd.classification(img_bytes)
            if code and len(code) >= 3:
                self.stats["local"] += 1
                return code
        except Exception as e:
            print(f"本地识别异常: {e}")

        # 第二层：打码平台
        if self.platform:
            try:
                with open("/tmp/c.png", "wb") as f:
                    f.write(img_bytes)
                res = self.platform.normal("/tmp/c.png")
                self.stats["platform"] += 1
                return res["code"]
            except Exception as e:
                print(f"平台识别异常: {e}")

        self.stats["failed"] += 1
        return None
```

配合重试和统计，你就能知道"本地识别实际能覆盖多少"——很多站点第一层命中率就有 85%+，平台只是兜底，账单比你想象的便宜。

## 五、成本与合规：最后要说的

### 成本核算表

| 方案 | 前期投入 | 单次成本 | 维护成本 | 适合量级 |
| ---- | -------- | -------- | -------- | -------- |
| 本地 OCR | 1 天 | ~0 | 低 | 任何量级 |
| 轨迹模拟 | 2–3 天 | ~0 | 中（要跟迭代） | 中等量级 |
| 浏览器伪装 | 3–5 天 | 服务器成本 | 高 | 中等量级 |
| 协议逆向 | 1–4 周 | ~0 | **很高** | 大量级 |
| 打码平台 | 半天 | $2–3/千次 | 极低 | 任何量级 |
| 自训模型 | 1–2 周 | 服务器成本 | 中 | 大量级且垂直 |

一句话：**先算钱，再写代码**。

### 边界在哪

这篇讲的所有技术，都应该是这三类场景：

- **自己的账号**做自动化，比如自动签到、自动预约，前提是站点条款允许
- **授权的安全测试**，有书面授权范围
- **学习研究**，跑通原理，不用于生产

不该是：批量注册、撞库、抢购薅羊毛、抓取受保护数据。

这不是场面话。技术本身没有立场，但**越过授权边界就是明确的违法行为**，而且现在法律在这一块的判例很多，不要拿自己的未来赌。

## 六、系列小结

四篇走下来，验证码破解的骨架其实很清晰：

1. **分类**（第一篇）：先判断这道题在考什么，缺口位置、轨迹、环境还是令牌
2. **识别**（第二篇）：拿图片，预处理，OCR
3. **轨迹**（第三篇）：贝塞尔/录播，加速-匀速-减速，过冲回退
4. **环境与兜底**（本篇）：真实浏览器 + Stealth，搞不定就上平台

三个原则贯穿始终：

- **按成本递增试方案**，别一上来就上最重的
- **留降级路径**，任何单一方案都会失效
- **守边界**，技术是为了解决问题，不是为了越界

## 参考

- [ddddocr](https://github.com/sml2h3/ddddocr)
- [Ultralytics YOLOv8](https://github.com/ultralytics/ultralytics)
- [2Captcha](https://2captcha.com/)
- [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra)
- [验证码 (CAPTCHA) 绕过 - 逆向工程 Cookbook](https://overkazaf.github.io/reverse_engineering/web/04-advanced-recipes/captcha_bypass/)
