-- 测试数据
CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    low_fats VARCHAR(1),
    recyclable VARCHAR(1)
);

INSERT INTO Products VALUES
(0, 'Y', 'N'),
(1, 'Y', 'Y'),
(2, 'N', 'Y'),
(3, 'Y', 'Y'),
(4, 'N', 'N');

-- 预期结果: 1, 3
SELECT product_id FROM Products WHERE low_fats = 'Y' AND recyclable = 'Y';