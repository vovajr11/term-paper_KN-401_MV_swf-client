import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { getQuizById } from '@api/quizzes/translateSentences';
import { IQuestion } from '@interfaces/quizTranslateSentences.interface';
import {
  QuestionList,
  QuestionItem,
  UserAnswer,
  LoaderWrapper,
} from './QuizResultsTranslateSentences.styles';

interface IProps {
  quizId: string;
  quizName: string;
  answers: string[];
}

const QuizResultsTranslateSentences = ({
  quizId,
  quizName,
  answers: userAnswers,
}: IProps) => {
  const [questions, setQuestions] = useState<IQuestion[] | undefined>();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getQuizById(quizId);

      setQuestions(data);
      setShowLoader(false);
    })();
  }, []);

  return (
    <>
      {showLoader ? (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        <QuestionList>
          {questions?.map(
            ({ _id, sentenceToBeTranslated, translatedSentence }, idx) => (
              <QuestionItem key={_id}>
                <div className="col">
                  <h3>Речення: {sentenceToBeTranslated}</h3>
                  <h3>Переклад: {translatedSentence}</h3>
                </div>
                <div className="col">
                  <UserAnswer>
                    Твоя відповідь: <br /> {userAnswers[idx]}
                  </UserAnswer>
                </div>
              </QuestionItem>
            ),
          )}
        </QuestionList>
      )}
    </>
  );
};

export default QuizResultsTranslateSentences;
