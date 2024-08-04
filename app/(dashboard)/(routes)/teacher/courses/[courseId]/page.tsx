const CoursesIdPage = ({
    params
}:{
    params:{courseId:string}
}
) => {
    return ( 
        <div>
            Courses Id : {params.courseId}
        </div>
     );
}
 
export default CoursesIdPage;