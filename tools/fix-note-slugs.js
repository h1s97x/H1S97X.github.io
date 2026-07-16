#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// 目录名称映射
const renames = {
  "----": "passive-scan",
  "-------": "browser-plugins",
  "---------": "difficulties-and-solutions",
  "--------------": "learning-blogs-websites",
  "-0------mod": "learning-mod-development",
  "csdn------------": "csdn-copy-protection",
  "httrack-----": "httrack-introduction",
  "kali-linux----": "kali-linux-commands",
  "keepass-----": "keepass-guide",
  "python----": "python-cryptography-experiment",
  "python-----": "python-cryptography",
};

const notesDir = path.join(__dirname, "../source/notes");

console.log("开始修复目录名称...\n");

for (const [oldName, newName] of Object.entries(renames)) {
  const oldPath = path.join(notesDir, oldName);
  const newPath = path.join(notesDir, newName);

  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`✓ ${oldName} -> ${newName}`);
  } else {
    console.log(`✗ 目录不存在: ${oldName}`);
  }
}

console.log("\n修复完成！");
