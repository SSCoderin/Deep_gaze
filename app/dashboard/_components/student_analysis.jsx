
import ReadingAnalysisVisualization from "@/app/demo/[flashcard]/_components/WordAnalysisDetail";
// import WordAnalysisDetail from "../../";
export default function StudentAnalysis({student_analysis,taskContent}) {
    return (
        <div className="mb-20">
            <div className="flex flex-row gap-4">
                <p onClick={() =>(window.location.href = `/dashboard/display-analysis/${student_analysis.task_id}`)} 
                className="text-3xl font-bold text-black cursor-pointer">←</p>
            <h1 className="text-3xl font-bold text-black">Student Analysis</h1>
            </div>
            <div className="px-10 py-4  mt-10 mb-10 rounded-2xl border-2 shadow-md border-gray-200 ">
                <h1 className="text-2xl text-blue-600 font-bold">{student_analysis.student_name}</h1>
                <h2>{student_analysis.student_email}</h2>

            </div>
           {Object.keys(student_analysis.analysis_data).map((index) => (
               <div key={index} className="px-10 py-4 mt-10 mb-10 rounded-2xl border-2 shadow-md border-gray-200 bg-orange-50">
                   <h2 className="text-3xl font-bold mb-6 underline text-green-500">{taskContent[index].title}</h2>
                   <ReadingAnalysisVisualization para={taskContent[index].content} wordGazeData={student_analysis.analysis_data[index]} />
               </div>
           ))}
            
        </div>
    );
}