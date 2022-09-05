#!/usr/bin/env node

/*
Copyright (c) 2022, Lasse Vestergaard
This file is a part of the Youtube Downloader Project
*/

"use strict";

import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import ytdl from "ytdl-core";

let time = Date.now();

const questions = [
  {
    type: "input",
    name: "url",
    message: "🔗 Enter youtube URL",
    validate: function (value) {
      if (value.length === 0) {
        return "You must enter an youtube url.";
      } else {
        return true;
      }
    },
  },

  {
    type: "input",
    name: "filename",
    message: "🎥 Video fileName",
    default: "video.mp4",
    validate: function (value) {
      if (!value) {
        return "Filename is required";
      } else {
        return true;
      }
    },
  },
];

inquirer.prompt(questions).then(function (answers) {
  if (answers.url) {
    ytdl(answers.url).pipe(fs.createWriteStream(answers.filename));
  } else {
    console.log(chalk.red("Failed to download video"));
  }
});
