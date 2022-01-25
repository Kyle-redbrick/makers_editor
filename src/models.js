import moment from "moment";

export class Banner {
  constructor(_banner) {
    this.type = _banner.type;
    this.label = _banner.label;
    this.link = _banner.linkURL;

    this.introduction = 
      _banner.localized[0]
      && _banner.localized[0].introduction;
    this.title =
      _banner.localized[0]
      && _banner.localized[0].title;
    this.background = 
      _banner.localized[0]
      && _banner.localized[0].backgroundImageURL
      && _banner.localized[0].backgroundImageURL.toDreamclassS3URL();
    this.mobileBackground = 
      _banner.localized[0]
      && _banner.localized[0].mobileBackgroundImageURL
      && _banner.localized[0].mobileBackgroundImageURL.toDreamclassS3URL();

    if (_banner.course) {
      this.course = new Course(_banner.course);
    }
  }
}

export class TodayPick {
  constructor(_pick) {
    this.type = _pick.type;

    this.introduction = 
      _pick.localized[0]
      && _pick.localized[0].introduction;
    this.title =
      _pick.localized[0]
      && _pick.localized[0].title;
    this.background =
      _pick.localized[0]
      && _pick.localized[0].backgroundImageURL
      && _pick.localized[0].backgroundImageURL.toDreamclassS3URL();

    this.lecture = new Lecture(_pick.lecture);
  }
}

export class Comment {
  constructor(_comment) {
    this.id = _comment.id;
    this.text = _comment.message;
    this.createdAt = _comment.createdAt ? new Date(_comment.createdAt) : null;
    this.updatedAt = new Date(_comment.updatedAt);
    this.isDeleted = _comment.isDeleted;
    
    if (_comment.user) {
      this.user = new User(_comment.user);
    }

    if (_comment.parent) {
      this.parent = new Comment(_comment.parent);
    }

    if (_comment.replies) {
      this.replies = _comment.replies.map((_c) => new Comment(_c));
    }
  }
}

export class Game {
  constructor(_game) {
    this.id = _game.pId;
    this.title = _game.name;
    this.icon = _game.icon;
    this.userName = _game.user.name;
    this.userIcon = _game.user.icon;
    this.url = _game.url;
    this.viewCount = _game.viewCount || 0;
    this.likeCount = _game.likeCount || 0;
    this.commentCount = _game.commentCount || 0;
    
    try {
      this.type = _game.project.lecture.course.type;
    } catch {
      this.type = null;
    }

    if (_game.user) {
      this.user = new User(_game.user);
    }
  }
}

export class ProjectTag {
  constructor(_tag) {
    this.type = _tag.tag.type;
    this.name = _tag.tag.name;
  }
}

export class Project {
  constructor(_project, _lectrue) {
    this.id = _project.id;
    this.lectureId = _lectrue.id;
    this.number = _project.number;
    this.completedMissionNum = 0;
    this.totalMissionNum = _project.totalMissionNum || 0;
    this.progress = 0;
    this.completed = false

    this.introduction = 
      _project.localized[0]
      && _project.localized[0].introduction;
    this.title =
      _project.localized[0]
      && _project.localized[0].title;
    this.sampleGameUrl = 
      _project.localized[0]
      && _project.localized[0].sampleGameURL;
    this.thumbnailUrl = 
      _project.localized[0]
      && _project.localized[0].thumbnailURL
      && _project.localized[0].thumbnailURL.toDreamclassS3URL();
    

    this.tags = [];
    if (_project.tags) {
      this.tags = _project.tags.map((t) => new ProjectTag(t));
    }

    if (_project.myProject) {
      this.myProject = new MyProject(_project.myProject);
      this.completedMissionNum = this.myProject.completedMissionNum || 0;
      this.progress = this.myProject.completedMissionNum > 0 && this.totalMissionNum > 0 ? Math.floor(this.myProject.completedMissionNum * 100 / this.totalMissionNum) : 0;
      this.completed = this.myProject.completed
    }
  }

  get programmingConceptTags() {
    return this.tags.filter(tag => tag.type === "programmingConcept");
  }
  get apiCommandConceptTags() {
    return this.tags.filter(tag => tag.type === "apiCommand");
  }
}

export class MyProject {
  constructor(_project) {
    this.id = _project.id;
    this.lastStudiedAt = _project.lastStudiedAt ? new Date(_project.lastStudiedAt) : null;
    this.studiedMinutes = _project.studiedMinutes;
    this.completedMissionNum = _project.completedMissionNum || 0;
    this.completedAt = _project.completedAt ? new Date(_project.completedAt) : null;
    this.completed = !!this.completedAt;
  }
}

export class Course {
  constructor(_course) {
    this.id = _course.id;
    this.type = _course.type;
    this.completedProjectNum = 0;
    this.totalProjectNum = 0;
    this.progress = 0

    // this.displayType = 
    //   _course.localized[0]
    //   && _course.localized[0].displayType;
    // this.phrase = 
    //   _course.localized[0]
    //   && _course.localized[0].phrase;
    // this.phrase2 = 
    //   _course.localized[0]
    //   && _course.localized[0].phrase2;
    // this.introduction = 
    //   _course.localized[0]
    //   && _course.localized[0].introduction;
    // this.title = 
    //   _course.localized[0]
    //   && _course.localized[0].title;

    // if (_course.iconURL) {
    //   this.icon = _course.iconURL && _course.iconURL.toDreamclassS3URL();
    // }

    // if (_course.localized[0] && _course.localized[0].videoURL) {
    //   this.video =
    //     _course.localized[0].videoURL
    //     && _course.localized[0].videoURL.toDreamclassS3URL();
    // }

    // if (_course.localized[0] && _course.localized[0].posterURL) {
    //   this.poster =
    //     _course.localized[0].posterURL
    //     && _course.localized[0].posterURL.toDreamclassS3URL();
    // }

    if (_course.progress !== undefined) {
      this.progress = Number(_course.progress);
    }

    if (_course.lectures) {
      this.lectures = _course.lectures.map((l) => {
        const lecture = new Lecture(l);

        this.completedProjectNum += lecture.completedProjectNum;
        this.totalProjectNum += lecture.totalProjectNum
        return lecture;
      });

      if (this.completedProjectNum && this.totalProjectNum) {
        this.progress = Math.floor(this.completedProjectNum * 100 / this.totalProjectNum)
      }
    }
  }

  get startLink() {
    switch(this.type) {
      case "oobc":
        return "/course/1";
      case "javascript":
        return "/course/2";
      case "python":
        return "/course/34";
      default:
        return null;
    }
  }
}

export class Lecture {
  constructor(_lecture) {
    this.id = _lecture.id;
    this.level = _lecture.level;
    this.number = _lecture.number;
    this.numberString = this.number < 10 ? `0${this.number}` : `${this.number}`;
    this.completedMissionNum = 0;
    this.totalMissionNum = 0;
    this.completedProjectNum = 0;
    this.totalProjectNum = 0;
    this.progress = 0;

    this.title = 
      _lecture.localized[0]
      && _lecture.localized[0].title;
    this.introduction = 
      _lecture.localized[0]
      && _lecture.localized[0].introduction;
    this.heroUrl =
      _lecture.localized[0]
      && _lecture.localized[0].heroURL
      && _lecture.localized[0].heroURL.toDreamclassS3URL();
    this.vThumbnailUrl =
      _lecture.localized[0]
      && _lecture.localized[0].v_thumbnailURL
      && _lecture.localized[0].v_thumbnailURL.toDreamclassS3URL();
    this.hThumbnailUrl =
      _lecture.localized[0]
      && _lecture.localized[0].h_thumbnailURL
      && _lecture.localized[0].h_thumbnailURL.toDreamclassS3URL();

    if (_lecture.course) {
      this.course = new Course(_lecture.course);
      this.type = _lecture.course.type;
    }

    if (_lecture.projects) {
      this.projects = _lecture.projects.map((p) => {
        const project = new Project(p, _lecture);
        this.completedMissionNum += project.completedMissionNum;
        this.totalMissionNum += project.totalMissionNum;
        this.totalProjectNum++;
        if (project.completed) {
          this.completedProjectNum++;
        }
        return project;
      });

      if (this.completedMissionNum && this.totalMissionNum) {
        if(this.completedMissionNum > this.totalMissionNum) {
          this.progress = 100;
        } else {
          this.progress = Math.floor(this.completedMissionNum * 100 / this.totalMissionNum)
        }
      }
    }
  }
}

export class TodayQuest {
  constructor(_quest) {
    this.title = _quest.achievement.localized[0] ? _quest.achievement.localized[0].reachedTitle : ""; 
    this.complete = _quest.complete;
  }
}

export class RecommendedProject {
  constructor(_recommendedProject) {
    this.id = _recommendedProject.id;
    this.title = _recommendedProject.title;
    this.thumbnail = _recommendedProject.thumbnailURL;
    this.pathname = _recommendedProject.pathname;

    if (_recommendedProject.lecture) {
      this.lecture = new Lecture(_recommendedProject.lecture);
    }
  }
}

export class MyCard {
  constructor(_myCard) {
    this.title = _myCard.title;
    this.icon = _myCard.iconURL;
  }
}

export class Question {
  constructor(_qna) {
    this.id = _qna.id;
    this.type = _qna.type;
    this.title = _qna.title;
    this.content = _qna.content;
    this.imageJSON = _qna.imageJSON;
    this.isDeleted = _qna.isDeleted;
    this.createdAt = new Date(_qna.createdAt);
    this.userId = _qna.userId;

    if (_qna.reply) {
      this.reply = new Question(_qna.reply);
    }
  }

  formattedCreatedAt(format = "YYYY.MM.DD") {
    return moment(this.createdAt).format(format);
  }
}

export class InventoryCard {
  constructor(_card) {
    this.read = _card.isRead;
    this.createdAt = new Date(_card.createdAt);
    this.card = new MyCard(_card.card);
  }

  formattedCreatedAt(format = "YYYY.MM.DD") {
    return moment(this.createdAt).format(format);
  }
}

export class User {
  constructor(_user) {
    this.id = _user.id;
    this.name = _user.name;
    this.email = _user.email;
    this.icon = _user.icon;
  }
}
