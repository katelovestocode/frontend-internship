import Papa from "papaparse";
import { toast } from "react-toastify";

export const downloadFile = (data: string | undefined, fileType: string, csvHeader: string, csvLineType: string) => {
    
  try {
      if (!data) {
        return;
      }
      let content;
      let mimeType;
      let fileName;

      if (fileType === "csv") {
        const parsedData = Papa.parse(data, { header: true }).data;

        if (!parsedData || parsedData.length === 0) {
          return;
        }

        const csvContent = [csvHeader];

        parsedData.forEach((attempt: any) => {
          const questionResponses = attempt.questionResponses
            ? `"${attempt.questionResponses.replace(/"/g, '""')}"`
            : '""';
          
        const csvLine =  csvLineType === 'company' ? (`${attempt.id},${questionResponses},${attempt.totalQuestions},${attempt.totalCorrect},${attempt.averageScoreWithinCompany},${attempt.overallRatingAcrossSystem},${attempt.userId},"${attempt.userEmail}","${attempt.userName}","${attempt.timestamp}"`) : (`${attempt.id},${questionResponses},${attempt.totalQuestions},${attempt.totalCorrect},${attempt.averageScoreWithinCompany},${attempt.overallRatingAcrossSystem},"${attempt.timestamp}"`)
         
        csvContent.push(csvLine);
        });
        content = csvContent.join("\n");
        mimeType = "text/csv";
        fileName = "quiz_results.csv";
      } else if (fileType === "json") {
        content = JSON.stringify(data, null, 2);
        mimeType = "application/json";
        fileName = "quiz_results.json";
      } else {
        return;
      }

      const encodedUri = encodeURI(`data:${mimeType};charset=utf-8,` + content);

      const link = document.createElement("a");
      link.href = encodedUri;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };