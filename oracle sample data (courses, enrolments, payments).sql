--Courses

CREATE TABLE Courses (
  course_id NUMBER PRIMARY KEY,
  course_name VARCHAR2(100),
  instructor_id NUMBER,
  FOREIGN KEY (instructor_id) REFERENCES Users(user_id)
);

BEGIN
INSERT INTO Courses (course_id, course_name, instructor_id)
VALUES (101, 'Defense Against the Dark Arts', 2);

INSERT INTO Courses (course_id, course_name, instructor_id)
VALUES (102, 'Transfiguration', 4);

INSERT INTO Courses (course_id, course_name, instructor_id)
VALUES (103, 'Potions', 6);

INSERT INTO Courses (course_id, course_name, instructor_id)
VALUES (104, 'Charms', 8);

INSERT INTO Courses (course_id, course_name, instructor_id)
VALUES (105, 'Herbology', 10);

END;
/


--Enrolments

CREATE TABLE Enrolments (
  enrolment_id NUMBER PRIMARY KEY,
  student_id NUMBER,
  course_id NUMBER,
  enrol_date DATE DEFAULT SYSDATE,
  FOREIGN KEY (student_id) REFERENCES Users(user_id),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

BEGIN

INSERT INTO Enrolments (enrolment_id, student_id, course_id)
VALUES (1001, 1, 101); -- Harry in Defense

INSERT INTO Enrolments (enrolment_id, student_id, course_id)
VALUES (1002, 3, 102); -- Ron in Transfiguration

INSERT INTO Enrolments (enrolment_id, student_id, course_id)
VALUES (1003, 5, 103); -- Hermione in Potions

INSERT INTO Enrolments (enrolment_id, student_id, course_id)
VALUES (1004, 7, 104); -- Luna in Charms

INSERT INTO Enrolments (enrolment_id, student_id, course_id)
VALUES (1005, 9, 105); -- Neville in Herbology 

END;
/

--Payments 

CREATE TABLE Payments (
  payment_id NUMBER PRIMARY KEY,
  student_id NUMBER,
  course_id NUMBER,
  amount NUMBER(8,2),
  payment_date DATE DEFAULT SYSDATE,
  FOREIGN KEY (student_id) REFERENCES Users(user_id),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

BEGIN
INSERT INTO Payments (payment_id, student_id, course_id, amount, payment_date)
VALUES (501, 1, 101, 500.00, DATE '2025-05-01'); -- Harry

INSERT INTO Payments (payment_id, student_id, course_id, amount, payment_date)
VALUES (502, 3, 102, 450.00, DATE '2025-05-02'); -- Ron

INSERT INTO Payments (payment_id, student_id, course_id, amount, payment_date)
VALUES (503, 5, 103, 480.00, DATE '2025-05-03'); -- Hermione

INSERT INTO Payments (payment_id, student_id, course_id, amount, payment_date)
VALUES (504, 7, 104, 470.00, DATE '2025-05-04'); -- Luna

INSERT INTO Payments (payment_id, student_id, course_id, amount, payment_date)
VALUES (505, 9, 105, 490.00, DATE '2025-05-04'); -- Neville
END;
/