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

  /*  let server = emailjs.server.connect({
    user: "darkside109@gmail.com",
    password: "FCv$t&v$p109",
    host: "smtp.gmail.com",
    ssl: true,
  });
 */
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
  /* const sendEmail = (e) => {
    e.preventDefault();

    console.log(form.current.user_name.value);

    let templateParams = {
      to_name: "destinatario",
      ref_num: "ref_num",
      user_email: form.current.user_email.value,
      user_name: "cinema mittente",
      sender_user: "incident report mail service",
      sender_mail: form.current.reply_to.value,
      reply_to: form.current.reply_to.value,
      message: form.current.message.value
    };

    emailjs
      .send(
        "service_62jmrjb",
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
  }; */
};
