---
title: python密码学实验
categories:
  - null
date: 2023-10-17 10:17:02
updated: 2023-10-17 10:17:02
tags:
---

## 实验一：熟悉Python开发环境，凯撒密码与仿射密码

### 实验目的

- 熟悉Pycharm/ Python Idle开发

- 完成Casear密码的编程。

### 实验内容

1、安装Python、Pycharm；了解Idle的应用；学会pip安装命令，将Cryptography gmpy2库安装到python中。

2、编写Casear密码程序，扩展到仿射密码、以及Casear密码的破译程序。

#### caesar密码python实现

[Python 密码学教程 - w3schools](https://www.w3schools.cn/cryptography_with_python/cryptography_with_python_affine_cipher.html)

第一版代码：

两个函数分别实现对Caesar密码的加密和解密，关键的操作公式是相同的，只是对密钥进行加减操作。

``` 第一版
for i in message:
	ciphertext += (chr(ord(i) + k)) # 将明文汉字转换为对应ASCLL数值或Unicode数值（ord函数），然后在此数值上+3，再将该值返回汉字（chr函数）
```

第二版代码：

同样是两个函数分别实现对Caesar密码的加密和解密，将公式进行修改，第一版并不能把密码限制在26个字母。

``` 第二版
for i in range(len(text)):
    char = text[i]
    if (char.isupper()):
        ciphertext += chr((ord(char) + key - ord('a')) % 26 + ord('a'))
    else:
        ciphertext += chr((ord(char) + key - ord('A')) % 26 + ord('A'))
```

第三版：

能够自定义

``` 第三版
SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 !?.'
def caesar_encrypt(mode, message, key):
    if mode[0] == 'd':
        key = -key
    ciphertext = ''
    for symbol in message:
        if symbol.isalpha():
          num = ord(symbol)+key
          if symbol.isupper():  # 所有密文字母是大写
              if num > ord('Z'):
                  num -= 26
              elif num < ord('A'):
                  num += 26
          elif symbol.islower():
              if num > ord('z'):
                  num -= 26
              elif num < ord('a'):
                  num += 26
        ciphertext += chr(num)
        else:
            ciphertext += symbol
    return ciphertext
```

暴力破解

```
def caesar_decrypt(message):
    LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    letters = "abcdefghijklmnopqrstuvwxyz"
    for key in range(26):
        translated = ''
        for symbol in message:
            if symbol in LETTERS:
                num = LETTERS.find(symbol)
                num = num - key
                if num < 0:
                    num = num + len(LETTERS)
                translated = translated + LETTERS[num]
            elif symbol in letters:
                num = letters.find(symbol)
                num = num - key
                if num < 0:
                    num = num + len(letters)
                translated = translated + letters[num]
            else:
                translated = translated + symbol
        print('Hacking key #%s: %s' % (key, translated))

```

#### 仿射密码

[仿射密码Python实现](https://www.cnblogs.com/clwsec/p/10198428.html)
仿射密码是一种替换密码。它是利用加密函数一个字母对一个字母的加密。

加密函数是E(x)= (ax + b) (mod m)，其中，a和m互质，m是字符集的大小。
（例如，26即是以26个字母作为编码，当m是26时，a必须是1，3，5，7，9，11，15，17，19，21，23，25其中之一）

解密函数为D(x) = a<sup>-1</sup>(x - b) (mod m)，其中a<sup>-1</sup>是a在Zm群的乘法逆元。

> **乘法逆元**
> 群G中任意一个元素a，都在G中有唯一的逆元a'，具有性质aa' = a'a = e，其中e为群的单位元。

```
'''
仿射密码
(a,b)
m = 26，字符集为小写字母
加密函数是E(x)= (ax + b) (mod m)
解密函数为D(x) = (a^-1)(x - b) (mod m)，其中a^-1是a的乘法逆元
'''

#通过一个简单的遍历得到a的乘法逆元，也可以通过gmpy2库中的invert函数实现
def get_inverse(a):
    for i in range(1,27):
        if a*i%26==1:
            return i

#加密
def encipher(a, b, p):
    c=[]
    for i in p:
        temp=((ord(i)-97)*a+b)%26+97
        c.append(chr(temp))
    print(''.join(c))

#解密
def decipher(a, b, c):
    a_inv = get_inverse(a)
    p=[]
    for i in c:
        temp=(((ord(i)-97)-b)*a_inv)%26+97
        p.append(chr(temp))
    print(''.join(p))

if __name__ == "__main__":
    a = 11
    b = 6
    message = 'sorcery'
    encipher(a,b,message)
    #decipher(a,b,message)
```

```
'''
仿射密码
m = 52
字符集为小写和大写字母
'''
import string
def encrypt(k1,k2,message):
    dic = string.ascii_letters
    c = []
    for i in message:
        if i.islower():
            num = ord(i)-ord('a')
            c.append(dic[(num*k1+k2)%52])
        elif i.isupper():
            num = ord(i)-ord('A')+26
            c.append(dic[(num*k1+k2)%52])
        else:
            c.append(i)
    print(''.join(c))

def decrypt(k1,k2,message):
    for i in range(52):
        if k1*i%52==1:
            inv = i
            break
    dic = string.ascii_letters
    m = []
    for i in message:
        if i.islower():
            num = ord(i)-ord('a')
            m.append(dic[inv*(num-k2)%52])
        elif i.isupper():
            num = ord(i)-ord('A')+26
            m.append(dic[inv*(num-k2)%52])
        else:
            m.append(i)
    print(''.join(m))

message = 'gVEXGT iDIT' #待加密或解密的消息
a = 5 # key的范围0~51之间
b = 29 # key的范围0~51之间
# encrypt(a,b,message)
decrypt(a,b,message)
```


```
class Affine(object):
    DIE = 128
    KEY = (7, 3, 55)

    def __init__(self):
        pass

    def encryptChar(self, char):
        K1, K2, kI = self.KEY
        return chr((K1 * ord(char) + K2) % self.DIE)

    def encrypt(self, string):
        return "".join(map(self.encryptChar, string))

    def decryptChar(self, char):
        K1, K2, KI = self.KEY
        return chr(KI * (ord(char) - K2) % self.DIE)

    def decrypt(self, string):
        return "".join(map(self.decryptChar, string))

affine = Affine()
print(affine.encrypt('Affine Cipher'))
print(affine.decrypt('*18?FMT'))

```

### 实验二：哈希函数

1、	编程实现生成空字符串、‘Alice’、‘Bob’的md5、sha256的哈希值；

```
import hashlib
def hash_md5():
    alice = hashlib.md5(b"Alice")
    bob = hashlib.md5(b"Bob")
    print('"Alice" md5:' + alice.hexdigest())
    print('"Bob" md5:' + bob.hexdigest())

def hash_sha256():
    alice = hashlib.sha256(b"Alice")
    bob = hashlib.sha256(b"Bob")
    print('"Alice" sha256:' + alice.hexdigest())
    print('"Bob" sha256:' + bob.hexdigest())
```

2、	编程实现生成自己名字的哈希值，注意编码的转换；

```
def myhash(str = "Yangjiaqing"):
    res = hashlib.md5(str.encode(encoding="utf-8"))
    print(str + " md5: " + res.hexdigest())
```

3、	编写体现哈希雪崩的代码，哈希值用二进制表示； 参考Listing2-5 代码；
[Python 哈希函数与消息认证实验](https://huaweicloud.csdn.net/63807e39dacf622b8df88c1c.html#:~:text=%23%20%E5%93%88%E5%B8%8C%E5%87%BD%E6%95%B0%E7%9A%84%E9%9B%AA%E5%B4%A9%E6%95%88%E5%BA%94%20%23%20author%3Amarxycj%20%23%20date%3A2021-10-29%20from%20hashlib,%27__main__%27%20%3A%20md5_value%20%3D%20input%20%28%29%20brute_md5%20%28md5_value%29)
[展示散列函数的雪崩效应](https://www.wolfram.com/language/12/cryptography/demonstrate-the-avalanche-effect-of-a-hash-function.html.zh)

```
def cmpcount(str1, str2):
    count = 0
    for i in range(0, len(str1)):
        if str1[i] != str2[i]:
            count += 1
    return count

def avalanche(str1 = 'bob', str2 = 'aob'):
    bin1 = str1.encode('utf-8')
    bin2 = str2.encode('utf-8')
    hexstring1 = hashlib.md5(bin1).hexdigest()
    binstring1 = '{:08b}'.format(int(hexstring1, 16))
    # binstring1 = bin(int(hexstring1, 16))
    hexstring2 = hashlib.md5(bin2).hexdigest()
    binstring2 = '{:08b}'.format(int(hexstring2, 16))
    # binstring2 = bin(int(hexstring2, 16))
    print(int(hexstring1, 16))
    print(int(hexstring2, 16))
    print(str1 + " md5:" + binstring1)
    print(str2 + " md5:" + binstring2)
    print("两个哈希值不同的位数：" + str(cmpcount(binstring1, binstring2)))
```

4、	利用scrypt密钥派生函数，实现口令加盐，生成更加安全的密钥（口令）；
[创建一个 Python 盐](https://deepinout.com/python/python-qa/169_python_creating_a_salt_in_python.html#:~:text=Python%203.6%2B%20%E7%9A%84%20secrets%20%E6%A8%A1%E5%9D%97%E6%8F%90%E4%BE%9B%E4%BA%86%E4%B8%80%E7%A7%8D%E6%9B%B4%E7%AE%80%E5%8D%95%E7%9A%84%E6%96%B9%E5%BC%8F%E6%9D%A5%E7%94%9F%E6%88%90%E9%9A%8F%E6%9C%BA%E6%95%B0%E3%80%82%20%E4%B8%8B%E9%9D%A2%E6%98%AF%E4%BD%BF%E7%94%A8%20secrets%20%E6%A8%A1%E5%9D%97%E7%94%9F%E6%88%90%E7%9B%90%E7%9A%84%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81%EF%BC%9A,16%20salt%20%3D%20secrets.token_hex%28salt_length%29%20print%28salt%29%20%E4%B8%8A%E8%BF%B0%E4%BB%A3%E7%A0%81%E5%B0%86%E7%94%9F%E6%88%90%E4%B8%80%E4%B8%AA%E9%95%BF%E5%BA%A6%E4%B8%BA%2016%20%E7%9A%84%E9%9A%8F%E6%9C%BA%E5%8D%81%E5%85%AD%E8%BF%9B%E5%88%B6%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%BD%9C%E4%B8%BA%E7%9B%90%E3%80%82)
Scrypt介绍
Scrypt 是一个强大的密钥派生函数，其通过内存密集的计算方式来抵抗 GPU、ASIC、FPGA 这类密码破解硬件的攻击。

Scrypt 接收多个输入参数，进行计算后输出密钥：

key = Scrypt(password, salt, N, r, p, derived-key-len)
其中的参数被称为" Scrypt 配置参数"，说明如下：

> N - 迭代次数，将影响 CPU 和内存用量，例：16384 、2048 ；
> r - 块大小，将影响 CPU 和内存用量，例：8 ；
> p - 并行因数 （并行运行的线程数，将影响 CPU 和内存用量），通常为 1 ；
> password - 输入的密码（推荐至少为 8 - 10 个字符）；
> salt - 安全产生的随机字节序列（最小为 64 位，推荐 128 位）；
> derived-key-len - 输出的密钥要有多少字节长，例如 32 （256 位）
> Scrypt 的输出密钥长度可以是 128 位到 512 位，但是通常为 256 位。

Salt 用使用 secrets 模块生成，也可以用os.urandom()随机生成

```
def hash_password(password = b'p@$Sw0rD~7'):
    salt_length = 16
    salt = secrets.token_bytes(salt_length)
    key = pyscrypt.hash(password, salt, 2048, 8, 1, 32)
    return key.hex()
```

5、实现区块链中的工作量证明编程，通过设置不同的难度，体会生成符合要求哈希值需要时间长短的不同；
[从零开始构建一个区块链（二）： 工作量证明](https://zhuanlan.zhihu.com/p/29903461)
[使用python实现简版区块链-工作量证明](https://blog.csdn.net/xiaobing1994/article/details/87967693)
[区块链的简单实现 - github](https://github.com/xiaobing94/pysimpleblockchain/tree/part2)

```
import sys
import hashlib
class NonceNotFoundError(Exception):
    pass

def encode(str, code='utf-8'):
    return str.encode(code)

def decode(bytes, code='utf-8'):
    return bytes.decode(code)

def sum256_hex(*args):
    m = hashlib.sha256()
    for arg in args:
        if isinstance(arg, str):
            m.update(arg.encode())
        else:
            m.update(arg)
    return m.hexdigest()

def sum256_byte(*args):
    m = hashlib.sha256()
    for arg in args:
        if isinstance(arg, str):
            m.update(arg.encode())
        else:
            m.update(arg)
    return m.digest()

class ProofOfWork(object):
    _N_BITS = 20
    MAX_BITS = 256
    MAX_SIZE = sys.maxsize
    def __init__(self, n_bits=_N_BITS):
        self._n_bits = n_bits
        self._target_bits = 1 << (self.MAX_BITS - n_bits)
    def _prepare_data(self, nonce):
        data_lst = [str(nonce)]
        return encode(''.join(data_lst))
    def run(self):
        nonce = 0
        found = False
        hash_hex = None
        print('Mining a new block')
        while nonce < self.MAX_SIZE:
            data = self._prepare_data(nonce)
            hash_hex = sum256_hex(data)
            hash_val = int(hash_hex, 16)
            sys.stdout.write("try nonce == %d hash_hex == %s \r" % (nonce, hash_hex))
            if (hash_val < self._target_bits):
                found = True
                break

            nonce += 1
        if found: 
            print('Found nonce == %d' % nonce)
        else:
            print('Not Found nonce')
            raise NonceNotFoundError('nonce not found')
        return nonce, hash_hex
if __name__ == "__main__":
    bc = ProofOfWork()
    bc.run()
```

### 实验三：实现对称加密编程

[分组密码的五大工作模式](https://zhuanlan.zhihu.com/p/364772865)

[使用cryptography进行AES的cbc模式加密 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/23276413)

[istommao/cryptokit: cryptokit is a cryptography kit (github.com)](https://github.com/istommao/cryptokit/tree/main)

4、练习3-12 手工CBC:编程应用AES的ECB模式实现CBC模式

``` 失败作
def ecbTocbc(self, data):
    if not isinstance(data, bytes):
        data = data.encode()
    cipher = Cipher(algorithms.AES(self.aes_key),
                    modes.ECB(),
                    backend=default_backend())
    dataList = []
    cipherText = []
    padded_data = self.pkcs7_padding(data)
    binary_data = bin((int(padded_data.hex(), 16)))[2:]
    while len(binary_data) / 128 >= 0:
        if len(binary_data) / 128 == 0 & len(binary_data) % 128 == 0:
            break
        elif len(binary_data) / 128 == 0 & len(binary_data) % 128 != 0:
            dataList.append(binary_data[0:])
            dataList.remove()
        else:
            dataList.append(binary_data[0:128])
            binary_data = binary_data[128:]

    c = "{:08b}".format(int(self.aes_iv.hex(), 16))
    for i in dataList:
        ci = cipher.encryptor().update(bytes(i^c))
        cipherText.append(ci)
        c = ci.decode()
        print(c)
    m = ''.join([c.hex() for c in cipherText])
    return m
```

5、练习3-13 简单CTR模式：编程应用AES的ECB模式实现CTR模式

``` 失败作
def ecbToctr(self, data):
    if not isinstance(data, bytes):
        data = data.encode()
    iv = self.aes_iv
    cipher = Cipher(algorithms.AES(self.aes_key),
                    modes.ECB(),
                    backend=default_backend())

    dataList = []
    cipherText = []
    padded_data = self.pkcs7_padding(data)
    binary_data = "{:08b}".format(int(padded_data.hex(), 16)) + '0'
    while len(binary_data) / 128 >= 0:
        if len(binary_data) / 128 == 0 & len(binary_data) % 128 == 0:
            break
        elif len(binary_data) / 128 == 0 & len(binary_data) % 128 != 0:
            dataList.append(binary_data[0:])
            dataList.remove()
        else:
            dataList.append(binary_data[0:128])
            binary_data = binary_data[128:]


    for i in dataList:
        ci = cipher.encryptor().update(iv) ^ i.encode()
        iv += 1
        cipherText.append(ci)
        print(ci)
    m = ''.join(cipherText)
    return m
```

### 实验四：实现非对称加密编程

[非对称密钥沉思系列（1）：RSA专题之PKCSv1.5填充模式下的选择性密文攻击概述-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/2186122)
