const UsersService = require("./users-service");

const getAllUsers = (request, response) =>
  UsersService.find()
    .then((users) => response.status(200).json({ users }))
    .catch((error) => {
      console.log("Fehler beim Erhalten von aller Nutzer. ", error);
      return response.status(500).json({
        message: "Fehler beim Erhalten von aller Nutzer.",
      });
    });

const addUser = (request, response) => {
  const userDTO = ({ first_name, last_name, email } = request.body);

  if (first_name && last_name && email) {
    /* userDTO.user_photo = `https://source.boringavatars.com/beam/300/${_user_id}${_user_id}${_user_id}?colors=2f70e9,e76f51,ffc638,f4a261,e97c2f`; */

    UsersService.add(userDTO)
      .then(({ id, first_name, last_name, email, created_at, updated_at }) =>
        response.status(201).json({
          id,
          email,
          first_name,
          last_name,
          created_at,
          updated_at,
        })
      )
      .catch((error) => {
        console.log("Fehler beim Hinzufügen von diesem Nutzer. ", error);
        return response.status(500).json({
          message: "Fehler beim Hinzufügen von diesem Nutzer.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler beim Hinzufügen von diesem Nutzer, da Angaben fehlen.",
    });
  }
};

const updateUser = (request, response) => {
  const updateUserDTO = ({
    first_name,
    last_name,
    email,
    image,
    pref_remote,
    pref_company_size,
    pref_sector,
    description,
  } = request.body);
  console.log(request.body, "KannIchGucken");
  if (
    request.body.id &&
    (first_name ||
      last_name ||
      email ||
      image ||
      pref_remote ||
      pref_company_size ||
      pref_sector ||
      description)
  ) {
    UsersService.update(request.body.id, updateUserDTO)
      .then((successFlag) =>
        successFlag // evtl > 0
          ? response
              .status(200)
              .json({ message: "Der Nutzer wurde aktualisiert." })
          : response.status(500).json({
              message:
                "Fehler bei der Aktualisierung des Nutzers, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log("Fehler bei der Aktualisierung des Nutzers. ", error);
        return response.status(500).json({
          message: "Fehler bei der Aktualisierung des Nutzers.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler bei der Aktualisierung des Nutzers, da Angaben fehlen.",
    });
  }
};

const getUserById = (request, response) => {
  const { id } = request.params;

  if (id) {
    UsersService.findById(id)
      .then((user) => {
        user
          ? response.status(200).json({ user })
          : response
              .status(404)
              .json({ message: "Dieser Nutzer wurde nicht gefunden." });
      })
      .catch((error) => {
        console.log("Fehler beim Erhalten von diesem Nutzer. ", error);
        return response.status(500).json({
          message: "Fehler beim Erhalten von diesem Nutzer.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler beim Erhalten von diesem Nutzer, da Angaben fehlen.",
    });
  }
};

const getUserSkillsByUserId = (request, response) => {
  const { id } = request.params;

  UsersService.findUserSkillsByUserId(id)
    .then((skills) => {
      console.log(skills, "ControllerSKillsOutPut");
      response.status(200).json({ skills });
    })
    .catch((error) => {
      console.log("Fehler beim Erhalten von allen Skills. ", error);
      return response.status(500).json({
        message: "Fehler beim Erhalten von allen Skills.",
      });
    });
};

const addUserSkillsByUserId = (request, response) => {
  const userSkillDTO = ({ fk_user_id, fk_skill_id } = request.body);

  if (fk_user_id && fk_skill_id) {
    UsersService.addUserSkill(userSkillDTO)
      .then(({ id, fk_user_id, fk_skill_id, created_at, updated_at }) =>
        response.status(201).json({
          id,
          fk_user_id,
          fk_skill_id,
          created_at,
          updated_at,
        })
      )
      .catch((error) => {
        console.log("Fehler beim Hinzufügen von diesem Nutzer Skill. ", error);
        return response.status(500).json({
          message: "Fehler beim Hinzufügen von diesem Nutzer Skill.",
        });
      });
  } else {
    return response.status(400).json({
      message:
        "Fehler beim Hinzufügen von diesem Nutzer Skill, da Angaben fehlen.",
    });
  }
};

const deleteUserSkill = (request, response) => {
  const userSkillDTO = ({ user_id, skill_id } = request.params);

  if (user_id && skill_id) {
    UsersService.deleteUserSkill(userSkillDTO)
      .then((numberOfDeletedSkills) =>
        numberOfDeletedSkills
          ? response.status(200).json({ message: "Der Skill wurde gelöscht." })
          : response.status(500).json({
              message:
                "Fehler beim Löschen des Skills, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log("Fehler beim Löschen des Skills. ", error);
        return response.status(500).json({
          message: "Fehler beim Löschen des Skills.",
        });
      });
  } else {
    return response.status(400).json({
      message: "Fehler beim Löschen des Skills, da Angaben fehlen.",
    });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  getUserById,
  getUserSkillsByUserId,
  addUserSkillsByUserId,
  deleteUserSkill,
};
