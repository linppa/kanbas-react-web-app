import QuizList from './quizList';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { KanbasState } from '../../store';

function Quizzes() {
    const { courseId } = useParams();
    
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

    return (
        <div>
            {/* QUIZ LIST */}
            <QuizList />
        </div>
    );
}
export default Quizzes;