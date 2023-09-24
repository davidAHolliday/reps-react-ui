import React, { useEffect, useState } from 'react';
import axios from "axios";
import Select from "react-select";
import Essay1 from './ViolationContents/essay1';
import MyForm from './RepsForm';
import Copy1 from './ViolationContents/copy';
import Essay2 from './ViolationContents/essay2';
import Copy2 from './ViolationContents/copy2';
import Essay3 from './ViolationContents/essay3';
import Copy3 from './ViolationContents/copy3';
import EssayFactory from './ViolationContents/EssayFormat';

const essay = 

{
  "Question 1":{
    "question":"Use the following passage to determine who was cited for identifying the significant negative correlation between tardiness and academic performance.",
    "title": "The Impact of Tardiness on Academic Performance: A Critical Analysis",
    "body": "Punctuality is a fundamental attribute that contributes to academic success. However, chronic tardiness among students has become a prevalent issue with potentially detrimental consequences on their academic performance. This essay explores the effects of tardiness on academic achievement, drawing upon research findings to underscore its significance as a hindrance to students' educational progress.\n\nTardiness disrupts the learning environment, affecting both the late student and their peers. When students arrive late to class, it interrupts the flow of instruction and disturbs the concentration of their fellow classmates. As stated by Rumberger and Losen (2017), latecomers not only miss crucial information and announcements but also create a distraction that hampers the overall learning experience. Consistently missing instructional time due to tardiness can impede students' comprehension of the curriculum, leading to gaps in knowledge and understanding.\n\nPersistent tardiness often correlates with reduced engagement and participation in classroom activities. According to a study by Gottfried (2014), students who are frequently late tend to exhibit lower levels of active involvement in class discussions, group work, and other interactive learning opportunities. This diminished engagement can result in limited interaction with teachers and peers, hindering the development of critical thinking skills, collaboration, and the exchange of ideas necessary for academic growth.\n\nTardiness can be indicative of poor time management and organizational skills. Students who struggle with punctuality often face challenges in planning and prioritizing their commitments, resulting in a domino effect of missed deadlines and incomplete assignments. As highlighted by DeSocio et al. (2018), chronic tardiness reflects a lack of discipline and can lead to a cycle of academic underachievement. The inability to manage time effectively compromises students' ability to meet academic obligations and succeed academically.\n\nThe accumulation of tardiness can have a direct impact on students' grades and overall academic achievement. A study by Hirschfield and Gasper (2011) found a significant negative relationship between tardiness and academic performance. Persistent tardiness often translates into missed quizzes, tests, or class participation points, ultimately affecting students' final grades. Additionally, the stress and anxiety resulting from trying to catch up on missed content and assignments can further impede students' academic progress, creating a vicious cycle of poor performance.\n\nTardiness emerges as a detrimental factor that impedes students' academic performance and hampers their educational journey. The disruptive nature of tardiness, coupled with reduced engagement, compromised time management, and the cumulative effect on grades, highlights the need for proactive measures to address this issue. Educational institutions, teachers, parents, and students themselves should collaborate to promote punctuality and instill the importance of time management skills. By fostering a culture of timeliness and emphasizing the connection between punctuality and academic success, we can create an environment that maximizes students' potential and enhances their overall academic performance.",
    "references": {
        "reference1": "DeSocio, J., Staggers, S., & Kurkiewicz, D. (2018). Students’ tardiness and discipline at a Midwestern middle school: A concurrent mixed-methods study. Journal of School Nursing, 34(6), 441-448.",
        "reference2": "Gottfried, M. A. (2014). Chronic absenteeism and its effects on students’ academic and socioemotional outcomes. Journal of Education for Students Placed at Risk (JESPAR), 19(2), 53-75."
    },
    "radioAnswers": {
        1: {"value": "incorrect","label":"Gottfried, M. A."},
        2: {"value": "correct","label":"Hirschfield and Gasper"},
        3: {"value": "incorrect","label":"DeSocio, J., Staggers, S., & Kurkiewicz, D."},
        4: {"value": "incorrect","label":"McDonald, J. and Smith, A."}
  
  
    }
  },

  "Question 2":{
  "question":"Use the following passage to determine who identified the distraction caused by tardy students and the negative effects it has on the other students?",
  "title": "The Impact of Tardiness on Academic Performance: A Critical Analysis",
  "body": "Punctuality is a fundamental attribute that contributes to academic success. However, chronic tardiness among students has become a prevalent issue with potentially detrimental consequences on their academic performance. This essay explores the effects of tardiness on academic achievement, drawing upon research findings to underscore its significance as a hindrance to students' educational progress.\n\nTardiness disrupts the learning environment, affecting both the late student and their peers. When students arrive late to class, it interrupts the flow of instruction and disturbs the concentration of their fellow classmates. As stated by Rumberger and Losen (2017), latecomers not only miss crucial information and announcements but also create a distraction that hampers the overall learning experience. Consistently missing instructional time due to tardiness can impede students' comprehension of the curriculum, leading to gaps in knowledge and understanding.\n\nPersistent tardiness often correlates with reduced engagement and participation in classroom activities. According to a study by Gottfried (2014), students who are frequently late tend to exhibit lower levels of active involvement in class discussions, group work, and other interactive learning opportunities. This diminished engagement can result in limited interaction with teachers and peers, hindering the development of critical thinking skills, collaboration, and the exchange of ideas necessary for academic growth.\n\nTardiness can be indicative of poor time management and organizational skills. Students who struggle with punctuality often face challenges in planning and prioritizing their commitments, resulting in a domino effect of missed deadlines and incomplete assignments. As highlighted by DeSocio et al. (2018), chronic tardiness reflects a lack of discipline and can lead to a cycle of academic underachievement. The inability to manage time effectively compromises students' ability to meet academic obligations and succeed academically.\n\nThe accumulation of tardiness can have a direct impact on students' grades and overall academic achievement. A study by Hirschfield and Gasper (2011) found a significant negative relationship between tardiness and academic performance. Persistent tardiness often translates into missed quizzes, tests, or class participation points, ultimately affecting students' final grades. Additionally, the stress and anxiety resulting from trying to catch up on missed content and assignments can further impede students' academic progress, creating a vicious cycle of poor performance.\n\nTardiness emerges as a detrimental factor that impedes students' academic performance and hampers their educational journey. The disruptive nature of tardiness, coupled with reduced engagement, compromised time management, and the cumulative effect on grades, highlights the need for proactive measures to address this issue. Educational institutions, teachers, parents, and students themselves should collaborate to promote punctuality and instill the importance of time management skills. By fostering a culture of timeliness and emphasizing the connection between punctuality and academic success, we can create an environment that maximizes students' potential and enhances their overall academic performance.",
  "references": {
      "reference1": "DeSocio, J., Staggers, S., & Kurkiewicz, D. (2018). Students’ tardiness and discipline at a Midwestern middle school: A concurrent mixed-methods study. Journal of School Nursing, 34(6), 441-448.",
      "reference2": "Gottfried, M. A. (2014). Chronic absenteeism and its effects on students’ academic and socioemotional outcomes. Journal of Education for Students Placed at Risk (JESPAR), 19(2), 53-75."
  },
  "radioAnswers": {
      1: {"value": "incorrect","label":"DeSocio"},
      2: {"value": "incorrect","label":"Gottfried"},
      3: {"value": "correct","label":"Rumberger and Losen"},
      4: {"value": "incorrect","label":"Gasper"}


  }
},

"Question 3":{
  "question":"Use the following passage to determine who was cited for identifying the positive mental health benefits of being punctual including decreased stress.",
  "title": "The Power of Punctuality: Unleashing the Benefits",
  "body": "Punctuality, the act of being on time or completing tasks within a specified timeframe, is a virtue that holds immense value in our modern society. Far from being a mere social convention, punctuality offers numerous benefits that positively impact individuals, businesses, and society as a whole. This essay aims to explore the advantages of punctuality and the evidence-based research that supports its significance. Drawing on recent scholarly sources published since 2018, we will delve into the multifaceted benefits of punctuality and demonstrate why it is an essential attribute to cultivate.\n\nOne of the key benefits of punctuality is its direct correlation with increased productivity. Research conducted by Lee et al. (2019) found that individuals who consistently practice punctuality exhibit higher levels of productivity in both personal and professional settings. By being punctual, individuals establish a disciplined routine and develop a sense of responsibility towards meeting deadlines. This discipline enhances time management skills, reduces procrastination, and boosts overall productivity.\n\nPunctuality plays a pivotal role in shaping an individual's professional reputation. According to a study by Davis and Stark (2018), professionals who consistently demonstrate punctuality are viewed as reliable, trustworthy, and competent by their peers, superiors, and clients. Being punctual showcases a commitment to honoring obligations and demonstrates respect for others' time, leading to increased opportunities for career advancement and building strong professional relationships.\n\nThe impact of punctuality on mental well-being should not be underestimated. Research by Johnson et al. (2020) highlights that individuals who adhere to punctuality experience reduced stress levels compared to those who are consistently late or fail to meet deadlines. Punctuality allows individuals to manage their time effectively, preventing the accumulation of unnecessary stress caused by rushing, missed deadlines, or unfinished tasks. This reduced stress not only enhances overall well-being but also enables individuals to perform better in various aspects of life.\n\nPunctuality serves as a catalyst for developing effective time management skills. A study by Roberts and Thompson (2018) reveals that individuals who prioritize punctuality consistently exhibit superior time management abilities. By valuing punctuality, individuals gain a heightened sense of awareness and control over their time, enabling them to allocate it efficiently to various tasks and responsibilities. These enhanced time management skills contribute to improved productivity, reduced stress, and overall success in personal and professional endeavors.\n\nIn conclusion, punctuality offers a wide array of benefits that positively impact individuals, businesses, and society. Through increased productivity, enhanced professional reputation, reduced stress levels, and improved time management skills, individuals who practice punctuality gain a competitive advantage in today's fast-paced world. The evidence presented from recent scholarly sources published since 2018 solidifies the significance of punctuality as a virtue worth cultivating. By embracing punctuality as a core value, individuals can unlock their full potential and contribute to a more efficient and prosperous society.",
  "references": {
    "reference1": "Davis, R. M., & Stark, E. M. (2018). The importance of punctuality and workplace timeliness: A moral and ethical imperative. Journal of Business Ethics, 151(1), 253-264.",
    "reference2": "Johnson, P., Sullivan, B. A., & Gravina, N. (2020). The link between punctuality and perceived stress. Journal of Applied Social Psychology, 50(1), 27-38.",
    "reference3": "Lee, K., Allan, B. A., & Sadler, P. (2019). Punctuality at work: A comprehensive model of individual differences in punctuality. Personality and Individual Differences, 139, 290-296.",
    "reference4": "Roberts, A., & Thompson, L. (2018). Punctuality as a window to the soul: How and why punctuality influences job performance. Journal of Applied Psychology, 103(3), 269-277.",
  },
  "radioAnswers": {
      1: {"value": "correct","label":"Johnson"},
      2: {"value": "incorrect","label":"Roberts"},
      3: {"value": "incorrect","label":"Lee"},
      4: {"value": "incorrect","label":"Davis"}


  }
},
"Question 4":{
  "question": "Use the following passage to determine who was cited for identifying the benefits of punctuality for building a reputation of trustworthiness, reliability and competence.",
  "title": "The Power of Punctuality: Unleashing the Benefits",
  "body": "Punctuality, the act of being on time or completing tasks within a specified timeframe, is a virtue that holds immense value in our modern society. Far from being a mere social convention, punctuality offers numerous benefits that positively impact individuals, businesses, and society as a whole. This essay aims to explore the advantages of punctuality and the evidence-based research that supports its significance. Drawing on recent scholarly sources published since 2018, we will delve into the multifaceted benefits of punctuality and demonstrate why it is an essential attribute to cultivate.\n\nOne of the key benefits of punctuality is its direct correlation with increased productivity. Research conducted by Lee et al. (2019) found that individuals who consistently practice punctuality exhibit higher levels of productivity in both personal and professional settings. By being punctual, individuals establish a disciplined routine and develop a sense of responsibility towards meeting deadlines. This discipline enhances time management skills, reduces procrastination, and boosts overall productivity.\n\nPunctuality plays a pivotal role in shaping an individual's professional reputation. According to a study by Davis and Stark (2018), professionals who consistently demonstrate punctuality are viewed as reliable, trustworthy, and competent by their peers, superiors, and clients. Being punctual showcases a commitment to honoring obligations and demonstrates respect for others' time, leading to increased opportunities for career advancement and building strong professional relationships.\n\nThe impact of punctuality on mental well-being should not be underestimated. Research by Johnson et al. (2020) highlights that individuals who adhere to punctuality experience reduced stress levels compared to those who are consistently late or fail to meet deadlines. Punctuality allows individuals to manage their time effectively, preventing the accumulation of unnecessary stress caused by rushing, missed deadlines, or unfinished tasks. This reduced stress not only enhances overall well-being but also enables individuals to perform better in various aspects of life.\n\nPunctuality serves as a catalyst for developing effective time management skills. A study by Roberts and Thompson (2018) reveals that individuals who prioritize punctuality consistently exhibit superior time management abilities. By valuing punctuality, individuals gain a heightened sense of awareness and control over their time, enabling them to allocate it efficiently to various tasks and responsibilities. These enhanced time management skills contribute to improved productivity, reduced stress, and overall success in personal and professional endeavors.\n\nIn conclusion, punctuality offers a wide array of benefits that positively impact individuals, businesses, and society. Through increased productivity, enhanced professional reputation, reduced stress levels, and improved time management skills, individuals who practice punctuality gain a competitive advantage in today's fast-paced world. The evidence presented from recent scholarly sources published since 2018 solidifies the significance of punctuality as a virtue worth cultivating. By embracing punctuality as a core value, individuals can unlock their full potential and contribute to a more efficient and prosperous society.",
  "references": {
      "reference1": "Davis, R. M., & Stark, E. M. (2018). The importance of punctuality and workplace timeliness: A moral and ethical imperative. Journal of Business Ethics, 151(1), 253-264.",
      "reference2": "Johnson, P., Sullivan, B. A., & Gravina, N. (2020). The link between punctuality and perceived stress. Journal of Applied Social Psychology, 50(1), 27-38.",
      "reference3": "Lee, K., Allan, B. A., & Sadler, P. (2019). Punctuality at work: A comprehensive model of individual differences in punctuality. Personality and Individual Differences, 139, 290-296.",
      "reference4": "Roberts, A., & Thompson, L. (2018). Punctuality as a window to the soul: How and why punctuality influences job performance. Journal of Applied Psychology, 103(3), 269-277.",

  
    },
  "radioAnswers": {
      1: {"value": "incorrect","label":"Johnson"},
      2: {"value": "incorrect","label":"Roberts"},
      3: {"value": "incorrect","label":"Lee"},
      4: {"value": "correct","label":"Davis"}


  }
},
}


function ViolationPage() {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [sectionNumber, setSectionNumber] = useState(1); //what section fo form are we on
  const [selectedAnswer, setSelectedAnswer] = useState('');


const saveAnswerAndProgress = () =>{
  if(selectedAnswer === "correct"){
    window.alert("this message is correct")
    console.log(sectionNumber)
    setSectionNumber((prev) => prev + 2);
    console.log(sectionNumber)

  }else{
    window.alert("this message is wrong")
    setSectionNumber((prev) => prev + 1);
  }

}

const textCorrectlyCopied = (selectedAnswer) =>{
  if(selectedAnswer === "correct"){
    window.alert("this message is correct")
    console.log(sectionNumber)
    setSectionNumber((prev) => prev + 1);
    console.log(sectionNumber)
}
}

  const handleRadioChange = (e) =>{
    setSelectedAnswer(e.target.value);



  }
  
  function handleSelect(data) {

      }

  
      const handleNext = (e) => {
       setSectionNumber(sectionNumber+1)
        
    
        }

  const handleSubmit = (e) => {
    e.preventDefault();


    }




  return (
    <div className="page-container">
      <div className="lrKTG">
        <div className="form-container" style={{width:"100%"}}>
          <form onSubmit={handleSubmit}>
          {/* <div className='question-container'>
              <label htmlFor="email">Student's Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={"email"}
                onChange={""}
                required
              />
            </div> */}
            <h2 className="instructions">Tardy Violation Level 1</h2>
   
{sectionNumber ===1 && <EssayFactory essay={essay['Question 1']} handleRadioChange={handleRadioChange} sectionName={"Question 1"} />}
{sectionNumber ===2 && <Copy1 saveAnswerAndProgress={textCorrectlyCopied}/>}
{sectionNumber ===3 && <EssayFactory essay={essay['Question 2']} handleRadioChange={handleRadioChange} sectionName={"Question 2"} />}
{sectionNumber ===4 && <Copy2 saveAnswerAndProgress={textCorrectlyCopied}/>}
{sectionNumber ===5 && <EssayFactory essay={essay['Question 3']} handleRadioChange={handleRadioChange}sectionName={"Question 3"} />}
{sectionNumber ===6 && <Copy3 saveAnswerAndProgress={textCorrectlyCopied}/>}
{sectionNumber ===7 && <EssayFactory essay={essay['Question 4']} handleRadioChange={handleRadioChange} sectionName={"Question 4"}/>}
{sectionNumber ===8 && <Copy3 saveAnswerAndProgress={textCorrectlyCopied}/>}


<button type='button' onClick={() => saveAnswerAndProgress()}>Submit</button>

{ sectionNumber === 7   && <button disabled={isAnswerCorrect} type="submit">Next</button>
}          </form>
        </div>
      </div>
    </div>
  );
}

export default ViolationPage;
