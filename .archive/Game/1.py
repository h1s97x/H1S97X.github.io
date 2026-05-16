import win32gui  # 界面模块
import win32process  # 进程模块
import win32api
import ctypes

# kernel 动态链接库
kernel32 = ctypes.windll.LoadLibrary(r"kernel32.dll")
# 调用最高权限执行（提权），否则进程句柄拒绝访问
PROCESS_ALL_ACCESS = (0x000F0000 | 0x00100000 | 0xFFF)
# 找到窗口句柄
window_handle = win32gui.FindWindow(None, "Plants vs. Zombies")
# get得到两个值，结果是一个数组，一个线程ID，另一个是进程ID
process_id = win32process.GetWindowThreadProcessId(window_handle)[1]  # 获取进程ID
# 得到进程句柄
process_handle = win32api.OpenProcess(PROCESS_ALL_ACCESS, False, process_id)

# print(process_handle)

data1 = ctypes.c_long()
kernel32.ReadProcessMemory(int(process_handle), 0x00755E0C, ctypes.byref(data1), 4, None)
data2 = ctypes.c_long()
kernel32.ReadProcessMemory(int(process_handle), data1.value + 0x868, ctypes.byref(data2),4, None)
data3 = ctypes.c_long()
kernel32.ReadProcessMemory(int(process_handle), data2.value + 0x5578, ctypes.byref(data3), 4,None)



sun_num = input("输入阳光值：")
kernel32.WriteProcessMemory(int(process_handle), data2.value + 0x5578, ctypes.byref(ctypes.c_long(int(sun_num))), 4,None)


