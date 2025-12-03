import { TotalReferralByWeek } from "src/components/globalComponents/dataDisplay/referralsByWeek";
import { ReferralByBehavior } from "src/components/globalComponents/dataDisplay/referralsByBehavior";
import TeacherInfractionOverPeriodBarChart from "src/components/globalComponents/dataDisplay/teacherInfractionPeriodBarChart";
import { IncidentByTeacherPieChart } from "src/components/globalComponents/dataDisplay/incident-by-teacher-pie-chart";
import { Top5TeacherRatioTable } from "src/components/globalComponents/dataDisplay/top-5-ratio-table";
import { WorseClassTable } from "src/components/globalComponents/dataDisplay/top-class-with-write-up";
import "./admin.css";
import ShoutOuts from "src/components/globalComponents/shoutOuts";
import OfficeReferrals from "src/components/globalComponents/officeReferrals/officeReferrals";
import { AdminSchoolReferralByTypePieChart } from "src/components/globalComponents/dataDisplay/adminSchoolReferralByTypePieChart";
import { AdminTeacherReferralByTypePieChart } from "src/components/globalComponents/dataDisplay/adminTeacherReferralByTypePieChart";
import { Bottom4PositiveTeacherTable } from "src/components/globalComponents/dataDisplay/bottom-5-ratio-table";
import TeacherManagedReferralByLevelByWeek from "src/components/globalComponents/dataDisplay/teacherManagedReferralByLevelByWeek";
import { AdminOverviewDto } from "src/types/responses";
import { ZoomableCard } from "src/helperComponents/displayHelpers";

interface AdminOverviewProps {
  adminDto: AdminOverviewDto;
}

const AdminOverviewPanel: React.FC<AdminOverviewProps> = ({ adminDto }) => {
  //Fetch Data to Prop Drill to Components

  const punishments = adminDto.punishmentResponse;

  const weeklyDataIncSOBxConcern = punishments?.filter((x) => {
    const currentDate = new Date();
    const itemDate = new Date(x.timeCreated);
    const sevenDaysAgo = new Date(
      currentDate.setDate(currentDate.getDate() - 7)
    );
    return itemDate > sevenDaysAgo;
  });

  const notClosed = adminDto.officeReferrals.filter(
    (x) => x.status !== "CLOSED"
  );

  return (
    <div className="admin-overview-wrapper">
      <div className="teacher-overview-first">
        <div className="custom-card">
          <ShoutOuts data={adminDto} />
        </div>
      </div>

      {notClosed.length > 0 && (
        <div className="teacher-overview-first">
          <div className="custom-card">
            <OfficeReferrals data={adminDto.officeReferrals} />
          </div>
        </div>
      )}

      <div className="section-container">
        <div className="section-header">Week At a Glance</div>
        <div className="section-content">
          <div className="section-third">
            <ZoomableCard title="School Referrals by Type">
              <AdminSchoolReferralByTypePieChart
                writeUpResponse={adminDto?.writeUpResponse || []}
                shoutOutsResponse={adminDto?.shoutOutsResponse || []}
                punishmentResponse={adminDto?.punishmentResponse || []}
                officeReferrals={adminDto?.officeReferrals || []}
              />
            </ZoomableCard>
          </div>

          <div className="section-third">
            <ZoomableCard title="Teacher Referrals by Type">
              <AdminTeacherReferralByTypePieChart
                writeUpResponse={adminDto.punishmentResponse}
              />
            </ZoomableCard>
          </div>

          <div className="section-third">
            <ZoomableCard title="Infractions Over Time (Last 7 Days)">
              <TeacherInfractionOverPeriodBarChart
                data={weeklyDataIncSOBxConcern}
              />
            </ZoomableCard>
          </div>
        </div>

        <div className="section-header">Coaching Information</div>
        <div className="section-content">
          <div className="section-third">
            <ZoomableCard title="Incidents by Teacher">
              <IncidentByTeacherPieChart
                writeUpResponse={adminDto.writeUpResponse}
                officeReferrals={adminDto.officeReferrals}
                teachers={adminDto.teachers}
                teacher={adminDto.teacher}
              />
            </ZoomableCard>
          </div>

          <div className="section-third">
            {adminDto.teachers && (
              <ZoomableCard title="Teacher Ratios (Top & Bottom)">
                <>
                  <Top5TeacherRatioTable
                    punishmentResponse={adminDto.punishmentResponse}
                    teachers={adminDto.teachers}
                  />
                  <br />
                  <Bottom4PositiveTeacherTable
                    punishmentResponse={adminDto.punishmentResponse}
                    teachers={adminDto.teachers}
                  />
                </>
              </ZoomableCard>
            )}
          </div>

          <div className="section-third">
            <ZoomableCard title="Worst Classes">
              <WorseClassTable
                punishmentResponse={adminDto.punishmentResponse}
                teachers={adminDto.teachers}
              />
            </ZoomableCard>
          </div>
        </div>

        {/* Longitudinal Reports */}
        <div className="section-header">Longitudinal Reports</div>
        <div className="section-content">
          <div className="section-third">
            <ZoomableCard title="Total Referrals by Week">
              <TotalReferralByWeek
                punishmentResponse={adminDto.punishmentResponse}
                officeReferrals={adminDto.officeReferrals}
              />
            </ZoomableCard>
          </div>

          <div className="section-third">
            <ZoomableCard title="Teacher Managed Referrals by Level">
              <TeacherManagedReferralByLevelByWeek
                punishmentResponse={adminDto.punishmentResponse}
              />
            </ZoomableCard>
          </div>

          <div className="section-third">
            <ZoomableCard title="Referrals by Behavior">
              <ReferralByBehavior data={adminDto.punishmentResponse} />
            </ZoomableCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPanel;
