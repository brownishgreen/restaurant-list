const bcrypt = require('bcryptjs');
const { User } = require('../models'); // 根據你的實際檔案位置調整路徑

async function updatePasswords() {
  try {
    // 查找 User1 和 User2
    const users = await User.findAll({
      where: {
        id: [3, 4] // 這裡是 User1 和 User2 的 ID
      }
    });

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      // 更新密碼
      await User.update(
        { password: hashedPassword },
        { where: { id: user.id } }
      );
    }

    console.log('密碼更新成功');
  } catch (error) {
    console.error('更新密碼失敗:', error);
  }
}

updatePasswords();
