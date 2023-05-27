import emailjs from "@emailjs/browser";

export const sendEmail = (update, report, user) => {
  console.log(update, report, user);
  let are_manager_email = "";

  switch (user.cinemaDet.area) {
    case 1:
      are_manager_email = "massimiliano.luciani@thespacecinema.it";
      break;
    case 2:
      are_manager_email = "matteo.pavan@thespacecinema.it";
      break;
    case 3:
      are_manager_email = "giuseppina.vernucci@thespacecinema.it";
      break;
    case 4:
      are_manager_email = "mario.natalicchio@thespacecinema.it";
      break;

    default:
      break;
  }

  console.log(are_manager_email, user.cinemaDet.email);

  let templateParams = {
    ref_num: `${report.ref_num}`,
    cinema: report.cinema,
    startDate: report.startDate,
    endDate: report.endDate,
    category: report.category,
    issueDescription: report.issue,
    screen_with_issue: report.screen_with_issue,
    screen_with_issue_capacity: report.screen_with_issue_capacity,
    status: report.resolved,
    screen_state: report.screen_state,
    show_stopped: report.show_stopped,
    refounds: report.refounds,
    comps: report.comps,
    note: report.note,
    solved: report.resolved,
    age: report.workDays,
    redattore: report.redattore,
    is_new: update ? "update" : "new",
    sender_user: "incident report mail service",
    send_to_mail: "incident.report@thespacecinema.it",
    to_area_manager: are_manager_email,
    to_cinema: user.cinemaDet.email,
  };

  console.log(templateParams, user);

  emailjs
    .send(
      "service_4qlb4wq",
      "template_qji02yn",
      templateParams,
      "cBX7tpOEhb4l4eVFI"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
};
