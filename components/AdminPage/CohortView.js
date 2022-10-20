import { useEffect, useState } from "react";
import s from "../../styles/AdminHomePage/CohortView.module.css";
import { useRouter } from "next/router";
import App from "./EditStudentModal";
import { useDispatch } from "react-redux";
import { setActiveStudent } from "../../redux/features/app-slice";
import { motion } from "framer-motion";
const CohortView = ({ currCohort, setCurrCohort }) => {
  const dispatch = useDispatch();
  const [clickedCohort, setClickedCohort] = useState([]);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //handle click for individual students
  const handleClick = (e) => {
    const data = e.target.dataset;
    dispatch(setActiveStudent(currCohort[0].students[data.student_id]));

    router.push({
      pathname: "/admin/viewstudent",
    });
  };
  //handle click for cohort
  const handleClickedCohort = (e) => {
    const cohort_id = e.target.dataset.cohort_id;
    console.log('from handle clicked cohort', cohort_id)
    setClickedCohort(cohort_id);
  }
  if (currCohort.length == 0) {
    return (
      <div className={s.default}>
        <h1>Select A Cohort to begin</h1>
      </div>
    );
  } else {
    return (
      <div className={s.container}>
        {currCohort.map((cohort) => (
          <div key={cohort.cohort_id}>
            <h1>{cohort.cohort_name}</h1>
            <div className={s.div}>
              <table className={s.table}>
                <tr className={s.headtr}>
                  <th className={s.tableheaders}>First</th>
                  <th className={s.tableheaders}>Last</th>
                  <th className={s.tableheaders}>ETS</th>
                  <th className={s.tableheaders}>Terminal</th>
                  <th className={s.tableheaders}>Branch</th>
                  <th className={s.tableheaders}>Edit</th>
                </tr>
                {cohort.students.map((student, index) => (
                  <motion.tr whileHover={{backgroundColor: '#F5F5F5'}} className={s.tr} key={student.user_id}>
                    <td>
                      <btn
                        className={s.td}
                        onClick={handleClick}
                        data-student_id={index}
                      >
                        {student.first}
                      </btn>
                    </td>
                    <td>
                      <btn
                        className={s.td}
                        onClick={handleClick}
                        data-student_id={index}
                      >
                        {student.last}
                      </btn>
                    </td>
                    <td>
                      <btn
                        className={s.td}
                        onClick={handleClick}
                        data-student_id={index}
                      >
                        {student.ets_date}
                      </btn>
                    </td>
                    <td>
                      <btn
                        className={s.td}
                        onClick={handleClick}
                        data-student_id={index}
                      >
                        {student.leave_start_date}
                      </btn>
                    </td>
                    <td>
                      <btn
                        className={s.td}
                        onClick={handleClick}
                        data-student_id={index}
                      >
                        {student.branch}
                      </btn>
                    </td>
                    <td>   
                      <div>
                      <App
                        cohort_id={student.cohort_id}
                        setClickedCohort={setClickedCohort}
                        clickedCohort={clickedCohort}
                        setCurrCohort={setCurrCohort}
                        student_id={student.user_id}
                        currCohort={currCohort}
                      />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default CohortView;
