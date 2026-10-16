---
title: 验证码破解入门（二）：文字验证码识别实战
description: "从 ddddocr 一行代码入门，到 OpenCV 图像预处理、Tesseract 兜底，讲清文字验证码识别的完整链路，以及识别不准时该往哪个方向调。"
tags: [安全, Python, 爬虫, 验证码, OCR]
published: 2026-10-15T11:00:00+08:00
updated: 2026-10-15T11:00:00+08:00
category: 技术
notebook: notes
---


上一篇把验证码家族按"考什么"分了一遍。这篇从最简单、也是现在最少见的一类开始：**文字验证码**。

少见不代表没用。教务系统、老旧的后台管理系统、政企内部站，这类"够用就行"的场景里，四个扭曲数字的验证码依然是主流。而且它的技术链路——**取图 → 预处理 → 识别 → 提交**——是所有验证码破解的骨架，后面滑块、点选都是这个骨架的变形。

## 一、先搞清楚图片怎么来的

不要一上来就写识别代码。先抓包，看图片是怎么发到你手上的。三种常见情况：

**情况 A：图片 URL 是明文，直接 GET 就行**

```
GET /captcha.php?t=1712345678901
```

带时间戳是为了防缓存。如果你直接用 `requests` 请求，注意**必须保持同一个 Session**，否则你拿到的图和待验证的 Session 不是一对：

```python
import requests

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
})

# 关键：图片和后续提交必须共用 session，否则 cookie 对不上
img_resp = session.get("https://example.com/captcha.php")
open("captcha.png", "wb").write(img_resp.content)
```

**情况 B：图片是 base64 内嵌在 JSON 里**

现在更常见，接口直接返回 `data:image/png;base64,iVBORw0K...`：

```python
import base64

data_url = resp.json()["image"]
b64 = data_url.split(",", 1)[1]           # 去掉前缀
img_bytes = base64.b64decode(b64)
```

**情况 C：图片被加密/拼接了**

比如"背景图 + 字符图"分两次返回，或者图片流异或了一个固定 key。这种就属于协议逆转的范畴了，得去翻 JS。**别硬刚**，先看看有没有更简单的站点练手。

## 二、ddddocr：一行代码解决 80% 的问题

国内做验证码识别，绕不开 [ddddocr](https://github.com/sml2h3/ddddocr)。它的作者用大量国内验证码训练了模型，对扭曲、粘连、干扰线严重的字样识别率远超通用 OCR。

安装：

```bash
pip install ddddocr
```

> 注意 ddddocr 依赖 onnxruntime，Python 版本太新可能装不上。3.8–3.11 最稳。

### 基础用法

```python
import ddddocr

ocr = ddddocr.DdddOcr()

with open("captcha.png", "rb") as f:
    img_bytes = f.read()

result = ocr.classification(img_bytes)
print(result)   # 例如 "4a7B"
```

就这么简单。`classification()` 接收 `bytes`，不接收文件路径，也不接收 PIL 对象——这点新手最容易搞错。

### 两个实用开关

```python
# 关闭候选字符集限制，某些奇怪字符集下更准
ocr = ddddocr.DdddOcr(show_ad=False)

# 指定字符集（如果站点只用数字，范围收窄通常更准）
ocr = ddddocr.DdddOcr(show_ad=False, charset="0123456789")
```

`show_ad=False` 关掉启动时的广告输出，脚本里很实用。

### 识别率不够时：输出概率看看

ddddocr 提供了查看每个字符置信度的接口，方便判断"是模型不行"还是"图太烂"：

```python
result = ocr.classification(img_bytes, probability=True)
print(result["charsets"])      # 候选字符
print(result["probability"])   # 每个字符的概率
```

如果概率普遍在 0.9 以上却识别错，多半是**图片本身有问题**（比如颜色空间不对），而不是模型不行。

## 三、图像预处理：比换模型更有效

很多人识别率低就想换模型、想训模型，其实**先把图片洗干净**收益更大。经典三步：

### 1. 灰度化 + 二值化

去掉颜色干扰，把图变成非黑即白：

```python
import cv2
import numpy as np

img = cv2.imread("captcha.png", cv2.IMREAD_GRAYSCALE)

# 自适应阈值：对光照不均匀的图比固定阈值稳
binary = cv2.adaptiveThreshold(
    img, 255,
    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv2.THRESH_BINARY,
    blockSize=11,
    C=2,
)
cv2.imwrite("clean.png", binary)
```

### 2. 去噪点与干扰线

细小的噪点和干扰线是 OCR 的主要敌人，用形态学操作清掉：

```python
# 开运算：先腐蚀后膨胀，去掉孤立的小噪点
kernel = np.ones((2, 2), np.uint8)
denoised = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)

# 如果干扰线很细，可以用中值滤波先糊一下，让字符更实
median = cv2.medianBlur(img, 3)
```

更狠一点的做法是**颜色过滤**：很多验证码字符是一个颜色、干扰线是另一个颜色。不需要识别，只需要把颜色不对的像素直接置白：

```python
img_color = cv2.imread("captcha.png")          # BGR
b, g, r = cv2.split(img_color)

# 假设字符是红色：红色通道明显高于绿蓝的地方保留
mask = cv2.inRange(img_color, (0, 0, 180), (80, 80, 255))
result = cv2.bitwise_not(mask)                  # 反色，黑字白底
```

这一步经常能让识别率从 50% 直接跳到 90%。

### 3. 放大与锐化

小图（字符高度不足 20px）直接丢给模型识别率会掉。**放大 2–3 倍再识别**，等于给模型更多细节：

```python
h, w = binary.shape
bigger = cv2.resize(binary, (w * 3, h * 3), interpolation=cv2.INTER_CUBIC)
```

### 预处理效果对比

| 步骤 | 典型识别率变化 |
| ---- | -------------- |
| 原图直接识别 | 40%–60% |
| 灰度 + 二值化 | 60%–75% |
| 加上去噪/颜色过滤 | 80%–90% |
| 再放大锐化 | 88%–95% |

数字只是量级示意，实际取决于验证码本身。**核心结论是：预处理的价值往往大于换模型。**

## 四、Tesseract：什么时候还需要它

[ddddocr](https://github.com/sml2h3/ddddocr) 专攻国内验证码，但有些场景反而用 Tesseract 更合适：

- 字符规整、干净的白底黑字（比如自研后台的简单验证码）
- 数字 + 少量字符，需要精确控制识别白名单
- 需要可解释的识别过程（学术/报告场景）

```bash
pip install pytesseract
# Windows 还需要单独装 tesseract-ocr 主程序
```

```python
import pytesseract
from PIL import Image

# 指定白名单和页面分割模式，比默认准得多
config = "--psm 7 -c tessedit_char_whitelist=0123456789"
text = pytesseract.image_to_string(Image.open("clean.png"), config=config)
print(text.strip())
```

几个关键参数：

- `--psm 7` 把图片当成单行文本处理（验证码基本都是单行）
- `tessedit_char_whitelist` 限制字符集，能大幅降低误识率
- `-l eng` 指定语言，不要加载中文包，慢且无益

**实测结论**：带干扰线的验证码，Tesseract 效果明显不如 ddddocr；但干净规整的数字验证码，Tesseract 配上白名单也很能打。**两个都装，按图选用。**

## 五、一次完整的识别 + 提交

把前面拼起来，走一遍完整流程：

```python
import requests
import ddddocr
import cv2
import numpy as np

class TextCaptchaSolver:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/120.0.0.0 Safari/537.36",
        })
        self.ocr = ddddocr.DdddOcr(show_ad=False)
        self._warm_up()

    def _warm_up(self):
        """先访问登录页，拿到必要的 cookie"""
        self.session.get("https://example.com/login")

    def _preprocess(self, img_bytes):
        """bytes -> 清洗后的 bytes"""
        arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(arr, cv2.IMREAD_GRAYSCALE)

        _, binary = cv2.threshold(img, 0, 255,
                                  cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        kernel = np.ones((2, 2), np.uint8)
        clean = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)

        h, w = clean.shape
        clean = cv2.resize(clean, (w * 2, h * 2), interpolation=cv2.INTER_CUBIC)

        _, buf = cv2.imencode(".png", clean)
        return buf.tobytes()

    def solve(self):
        img_resp = self.session.get("https://example.com/captcha", timeout=10)
        img_resp.raise_for_status()

        clean = self._preprocess(img_resp.content)
        code = self.ocr.classification(clean)
        return code

    def login(self, username, password):
        code = self.solve()
        resp = self.session.post(
            "https://example.com/api/login",
            data={"username": username, "password": password, "captcha": code},
            timeout=10,
        )
        return resp.json()


if __name__ == "__main__":
    solver = TextCaptchaSolver()
    print(solver.login("user", "pass"))
```

几个值得注意的细节：

1. **先访问登录页热身**。很多站点在登录页才下发 cookie，直接请求验证码接口会被识别。
2. **失败就重试，不要崩**。验证码识别天然有错误率，写成 `for _ in range(5)` 的重试循环。
3. **不要在循环里新建 Session**。每次新建会让服务端觉得是一批新用户，反而更容易触发风控。

## 六、识别不准怎么办：排查顺序

遇到识别率低，按这个顺序查，**别急着训模型**：

1. **图片拿对了吗？** 把下载的图存下来看一眼。有没有可能是拿到了上一张贴在 Session 上的图，或者拿到的是占位图？
2. **Session/cookie 对得上吗？** 图片和提交必须同 Session。
3. **颜色空间对了吗？** OpenCV 是 BGR，PIL 是 RGB，互转时红蓝颠倒会让颜色过滤完全失效。
4. **预处理试过了吗？** 二值化、颜色过滤、放大。
5. **字符集收窄了吗？** 纯数字就限定数字，能去掉大部分误识。
6. **是不是该用打码平台？** 如果单张成本低于你的时间成本，别硬刚。

第 6 点不是认输。**工程上正确的取舍，比技术上的胜利更值钱。**

## 七、小结

- 文字验证码的完整链路是：取图 → 预处理 → 识别 → 提交，所有验证码破解都是这个骨架
- ddddocr 是性价比最高的起点，一行代码能解决大部分场景
- 预处理（二值化、颜色过滤、放大）的收益往往大于换模型
- Tesseract 在干净规整的图上更可控，两个工具备着按图选用
- 识别不通过时，先排查图片、Session、颜色空间这些"低级问题"，再考虑上打码平台

下一篇进入滑块：找缺口、生成轨迹，一关比一关难。

## 参考

- [ddddocr](https://github.com/sml2h3/ddddocr)
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
- [验证码 (CAPTCHA) 绕过 - 逆向工程 Cookbook](https://overkazaf.github.io/reverse_engineering/web/04-advanced-recipes/captcha_bypass/)
