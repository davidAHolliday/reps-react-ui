import react from "react";



const Essay1 = (props) =>{




    return(
        
        <div className='section'>
             
             <div style={{ fontFamly: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.5' }}>
               <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>The Impact of Tardiness on Academic Performance: A Critical Analysis</h1>
         
               <p>Punctuality is a fundamental attribute that contributes to academic success. However, chronic tardiness among students has become a prevalent issue with potentially detrimental consequences on their academic performance. This essay explores the effects of tardiness on academic achievement, drawing upon research findings to underscore its significance as a hindrance to students' educational progress.</p>
         
               <p>Tardiness disrupts the learning environment, affecting both the late student and their peers. When students arrive late to class, it interrupts the flow of instruction and disturbs the concentration of their fellow classmates. As stated by Rumberger and Losen (2017), latecomers not only miss crucial information and announcements but also create a distraction that hampers the overall learning experience. Consistently missing instructional time due to tardiness can impede students' comprehension of the curriculum, leading to gaps in knowledge and understanding.</p>
         
               <p>Persistent tardiness often correlates with reduced engagement and participation in classroom activities. According to a study by Gottfried (2014), students who are frequently late tend to exhibit lower levels of active involvement in class discussions, group work, and other interactive learning opportunities. This diminished engagement can result in limited interaction with teachers and peers, hindering the development of critical thinking skills, collaboration, and the exchange of ideas necessary for academic growth.</p>
         
               <p>Tardiness can be indicative of poor time management and organizational skills. Students who struggle with punctuality often face challenges in planning and prioritizing their commitments, resulting in a domino effect of missed deadlines and incomplete assignments. As highlighted by DeSocio et al. (2018), chronic tardiness reflects a lack of discipline and can lead to a cycle of academic underachievement. The inability to manage time effectively compromises students' ability to meet academic obligations and succeed academically.</p>
         
               <p>The accumulation of tardiness can have a direct impact on students' grades and overall academic achievement. A study by Hirschfield and Gasper (2011) found a significant negative relationship between tardiness and academic performance. Persistent tardiness often translates into missed quizzes, tests, or class participation points, ultimately affecting students' final grades. Additionally, the stress and anxiety resulting from trying to catch up on missed content and assignments can further impede students' academic progress, creating a vicious cycle of poor performance.</p>
         
               <p>Tardiness emerges as a detrimental factor that impedes students' academic performance and hampers their educational journey. The disruptive nature of tardiness, coupled with reduced engagement, compromised time management, and the cumulative effect on grades, highlights the need for proactive measures to address this issue. Educational institutions, teachers, parents, and students themselves should collaborate to promote punctuality and instill the importance of time management skills. By fostering a culture of timeliness and emphasizing the connection between punctuality and academic success, we can create an environment that maximizes students' potential and enhances their overall academic performance.</p>
         
               <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>References:</h2>
               <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                 <li style={{ marginBottom: '10px' }}>
                   <p><strong>DeSocio, J., Staggers, S., & Kurkiewicz, D. (2018).</strong> Students’ tardiness and discipline at a Midwestern middle school: A concurrent mixed-methods study. <em>Journal of School Nursing, 34(6)</em>, 441-448.</p>
                 </li>
                 <li style={{ marginBottom: '10px' }}>
                   <p><strong>Gottfried, M. A. (2014).</strong> Chronic absenteeism and its effects on students’ academic and socioemotional outcomes. <em>Journal of Education for Students Placed at Risk (JESPAR), 19(2)</em>, 53-75.</p>
                 </li>
               </ul>
             </div>
         
         
                     <div className="md0UAd" aria-hidden="true" dir="auto">
                       * Indicates required question
                     </div>
               
                 
                  
                     
         <hr></hr>
         <div className='question-container'>
           <h5>Use the following passage to determine who was cited for identifying the significant negative correlation between tardiness and academic performance *</h5>
           <div>
             <label>
               <input
                 type="radio"
                 id="gottfried"
                 name="infraction"
                 value="correct"
                 onChange={props.handleRadioChange}
               />
               Gottfried, M. A.
             </label>
           </div>
           <div>
             <label>
               <input
                 type="radio"
                 id="hirschfield"
                 name="infraction"
                 value="wrong"
                 onChange={props.handleRadioChange}
               />
               Hirschfield and Gasper
             </label>
           </div>
           <div>
             <label>
               <input
                 type="radio"
                 id="desocio"
                 name="infraction"
                 value="wrong"
                 onChange={props.handleRadioChange}
               />
               DeSocio, J., Staggers, S., & Kurkiewicz, D.
             </label>
           </div>
           <div>
             <label>
               <input
                 type="radio"
                 id="mcdonald"
                 name="infraction"
                 value="wrong"
                 onChange={props.handleRadioChange}      />
               McDonald, J. and Smith, A.
             </label>
           </div>
         </div>
         </div>
   
    )
}

 export default Essay1