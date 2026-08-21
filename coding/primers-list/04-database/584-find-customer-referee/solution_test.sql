-- 测试数据
CREATE TABLE Customer (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    referee_id INT
);

INSERT INTO Customer VALUES
(1, 'Will', NULL),
(2, 'Jane', NULL),
(3, 'Alex', 2),
(4, 'Bill', NULL),
(5, 'Zack', 1),
(6, 'Mark', 2);

-- 预期结果: Will, Jane, Bill, Zack
SELECT name FROM Customer WHERE referee_id IS NULL OR referee_id != 2;