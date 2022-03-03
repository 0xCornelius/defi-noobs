import classNames from "classnames";
import { useNavigate } from "react-router";
import { t } from "i18next";

export function CoursesHome() {
  const navigate = useNavigate();
  
  const courses = [
    {
      name: "Setup",
      url: "setup",
      description:
        "Create your first wallet and learn how seed phrases work and how to secure them.",
    },
    {
      name: "Starter",
      url: "starter",
      description:
        "Learn to create a wallet and use it's basic functions of receiving and sending money.",
    },
    {
      name: "Learn gas",
      url: "gas",
      description:
        "Understand why and how you pay for transaction fees when you use the Ethereum blockchain.",
    },
    {
      name: "Dapps",
      url: "dapps",
      description: "Use and interact with Ethereum dapps.",
      inProgress: true,
    },
    {
      name: "REKT",
      url: "rekted",
      description:
        "Learn how to identify or avoid possible scams and protect your money.",
      inProgress: true,
    },
  ];

  return (
    <div className="courses-home">
      <h1>{t("Available Courses")}</h1>
      <div className="row">
        {courses.map((course) => (
          <div className="col col-4 mt-5" key={course.url}>
            <div
              className={classNames("card position-relative", {
                clickable: !course.inProgress,
              })}
              onClick={() => {
                !course.inProgress && navigate(course.url);
              }}
            >
              {course.inProgress && (
                <div className="soon-banner position-absolute fw-bold">
                  {t("SOON")}
                </div>
              )}
              <h5 className="card-header">{t(course.name)}</h5>
              <div className="card-body">
                <p className="card-text">{t(course.description)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
