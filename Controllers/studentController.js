/*
    in this file we need to export our model then combine it with our logic
    - create student
    - get all student
    - get one student
    - update student
    - delete student

*/

//importing the student model

const Student = require('../Models/Student');

// 1. create student

const createStudent = async (req, res) => {
    /*
        - to create a student we need the following
        1. get details from the the user using (request object)
        2. validate the details
        3. use try and catch with student model to create the student
        4. respond to use the user if everything is fine
    */

        //1.
        const { name, age } = req.body;
        //2.
        if(!name || !age ) res.status(400).json({
            messsage: 'name and age are required'
        })
        //3.
        try{
            //create student
            const student = await Student.create({
                name,
                age
            })
        }
        catch(error){
            res.status(500).json({
                message: error.message
            })
        }

        res.status(201).json({
            message: 'Student inserted successfully',
            
        })
}

// 2. get all students

const getAllStudents = async (req, res) =>{
    /*
        - to get all students we need the following
        1. we need to use the student model with function to find
        2. validate in case there are no student yet
        3. use try and catch with student model to get the students
        4. respond to use the user if everything is fine
    */

        //1. 
        try{
            const students = await Student.find();

        //2.
            if(students.length < 1) res.status(200).json({
                message: 'there is no student registered at the moment'
            })
        //3.
            res.status(200).json({
                students
            })
        }
        catch(error){
            res.status(500).json({
                message: error.message
            })
        }
}

//3. get one student

const getOneStudent = async (req, res) =>{
    /*
        - to get one student we need the following
        1. we need to use the id student we wish to display
        2. validate in case the user inputs invalid details
        3. use try and catch with student model to get the student
        4. respond to use the user if everything is fine
    */

    //1.
    const id = req.params.id;

    try{
        const student = await Student.find(s => s.id === id);

        //2. 
        if(!student) res.status(404).json({
            message: 'student not found'
        })

        res.status(200).json({
            student
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

//4. update student

const updateStudent = (req, res) =>{
    /*
        - to get update student we need the following
        1. we need to use the id student we wish to update
        2. we need the new details we wish to update
        2. validate in case the user inputs invalid details
        3. use try and catch with student model to update the student
        4. respond to use the user if everything is fine
    */

    //1.
    try{
        const id = req.params.id;
        const { name, age } = req.body;

        const student = Student.find(s => s.id === id);

        if(!student) res.status(404).json({
            message: 'student not found'
        })

        if(name) student.name = name
        if(age) student.age = age

        res.status(200).json({
            message: 'student updated successfully',
            student
        })

    }
    catch(error){
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteStudent = async (req, res) =>{
    const id = req.params.id;

    const index = Student.findIndex(s => s.id === id);

    const deletedStudent = Student.splice(index, 1);

    if(index === -1) res.status(404).json({
        message: 'student not found'
    })

    res.status(200).json({
        message: 'student deleted',
        deletedStudent
    })
}

module.exports = {
    createStudent,
    getAllStudents,
    getOneStudent,
    updateStudent,
    deleteStudent
}