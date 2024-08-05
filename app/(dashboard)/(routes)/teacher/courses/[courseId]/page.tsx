import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard, LayoutDashboardIcon } from "lucide-react";


const CoursesIdPage = async({
    params
}:{
    params:{courseId:string}
}
) => {
    const {userId}=auth();

    if (!userId){
        return redirect("/");  
    }

    const course= await db.course.findUnique({
        where:{
            id:params.courseId
        }
    });

    if (!course) {
        return redirect("/");  
    };

    const requirdFields=[
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ];

    const totalFields=requirdFields.length;
    const completedFields=requirdFields.filter(Boolean).length;

    const completionText=`(${completedFields}/${totalFields})`;

    return ( 
        <div className="p-6">
           <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                    Course setup
                </h1>
                <span className="text-sm text-slate-700">
                    complete all fields {completionText};
                </span>
            </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={LayoutDashboardIcon}/>
                    <h1 className="text-xl ">
                        customize your course 
                    </h1>
                </div>
            </div>

           </div>
        </div>
     );
}
 
export default CoursesIdPage;