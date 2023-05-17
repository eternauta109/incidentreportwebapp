import emailjs from "@emailjs/browser";

export const sendEmail = (update, report, user) => {
  console.log(update, report, user);

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
    send_to_mail: "e_ternauta@live.it",
    to_area_manager: "e_ternauta@live.it",
    to_cinema: "darkside109@gmail.com",
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
