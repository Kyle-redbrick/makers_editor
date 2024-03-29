/* Phaser Virtual Joystick Plugin (C) Copyright 2015 Photon Storm Ltd. */
(Phaser.VirtualJoystick = function(a, b) {
  Phaser.Plugin.call(this, a, b),
    (this.sticks = null),
    (this.buttons = null),
    (this._pointerTotal = 0);
}),
  (Phaser.VirtualJoystick.prototype = Object.create(Phaser.Plugin.prototype)),
  (Phaser.VirtualJoystick.prototype.constructor = Phaser.VirtualJoystick),
  (Phaser.VirtualJoystick.NONE = 0),
  (Phaser.VirtualJoystick.HORIZONTAL = 1),
  (Phaser.VirtualJoystick.VERTICAL = 2),
  (Phaser.VirtualJoystick.CIRC_BUTTON = 0),
  (Phaser.VirtualJoystick.RECT_BUTTON = 1),
  (Phaser.VirtualJoystick.prototype.init = function() {
    (this.sticks = new Phaser.ArraySet()),
      (this.buttons = new Phaser.ArraySet());
  }),
  (Phaser.VirtualJoystick.prototype.addStick = function(a, b, c, d, e, f) {
    "undefined" == typeof e && (e = "base"),
      "undefined" == typeof f && (f = "stick");
    var g = new Phaser.VirtualJoystick.Stick(this, a, b, c, d, e, f);
    return (
      this.sticks.add(g),
      this._pointerTotal++,
      this._pointerTotal > 2 && this.game.input.addPointer(),
      g
    );
  }),
  (Phaser.VirtualJoystick.prototype.addDPad = function(
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i
  ) {
    "undefined" == typeof e && (e = "neutral"),
      "undefined" == typeof f && (f = "up"),
      "undefined" == typeof g && (g = "down"),
      "undefined" == typeof h && (h = "left"),
      "undefined" == typeof i && (i = "right");
    var j = new Phaser.VirtualJoystick.DPad(this, a, b, c, d, e, f, g, h, i);
    return (
      this.sticks.add(j),
      this._pointerTotal++,
      this._pointerTotal > 2 && this.game.input.addPointer(),
      j
    );
  }),
  (Phaser.VirtualJoystick.prototype.removeStick = function(a) {
    this.sticks.remove(a), a.destroy();
  }),
  (Phaser.VirtualJoystick.prototype.addButton = function(a, b, c, d, e, f) {
    "undefined" == typeof f && (f = Phaser.VirtualJoystick.CIRC_BUTTON);
    var g = new Phaser.VirtualJoystick.Button(this, f, a, b, c, d, e);
    return (
      this.buttons.add(g),
      this._pointerTotal++,
      this._pointerTotal > 2 && this.game.input.addPointer(),
      g
    );
  }),
  (Phaser.VirtualJoystick.prototype.removeButton = function(a) {
    this.buttons.remove(a), a.destroy();
  }),
  (Phaser.VirtualJoystick.prototype.update = function() {
    this.sticks.callAll("update"), this.buttons.callAll("update");
  }),
  (Phaser.VirtualJoystick.prototype.destroy = function() {
    this.sticks.removeAll(!0), this.buttons.removeAll(!0);
  }),
  (Phaser.VirtualJoystick.Stick = function(a, b, c, d, e, f, g) {
    (this.pad = a),
      (this.baseFrame = f),
      (this.stickFrame = g),
      (this.position = new Phaser.Point(b, c)),
      (this.line = new Phaser.Line(
        this.position.x,
        this.position.y,
        this.position.x,
        this.position.y
      )),
      (this.baseSprite = this.pad.game.make.sprite(
        this.position.x,
        this.position.y,
        e,
        f
      )),
      this.baseSprite.anchor.set(0.5),
      (this.stickSprite = this.pad.game.make.sprite(
        this.position.x,
        this.position.y,
        e,
        g
      )),
      this.stickSprite.anchor.set(0.5),
      (this.baseHitArea = new Phaser.Circle(
        this.position.x,
        this.position.y,
        d
      )),
      (this.stickHitArea = new Phaser.Circle(
        this.position.x,
        this.position.y,
        this.stickSprite.width
      )),
      (this.limitPoint = new Phaser.Point()),
      (this.pointer = null),
      (this.enabled = !0),
      (this.isDown = !1),
      (this.isUp = !0),
      (this.onDown = new Phaser.Signal()),
      (this.onUp = new Phaser.Signal()),
      (this.onMove = new Phaser.Signal()),
      (this.onUpdate = new Phaser.Signal()),
      (this.timeDown = 0),
      (this.timeUp = 0),
      (this.angle = 0),
      (this.angleFull = 0),
      (this.quadrant = 0),
      (this.octant = 0),
      (this.motionLock = Phaser.VirtualJoystick.NONE),
      (this._distance = d),
      (this._deadZone = 0.15 * d),
      (this._scale = 1),
      (this._tracking = !1),
      (this._showOnTouch = !1),
      this.pad.game.stage.addChild(this.baseSprite),
      this.pad.game.stage.addChild(this.stickSprite),
      this.pad.game.input.onDown.add(this.checkDown, this),
      this.pad.game.input.onUp.add(this.checkUp, this),
      this.pad.game.input.addMoveCallback(this.moveStick, this);
  }),
  (Phaser.VirtualJoystick.Stick.prototype = {
    checkDown: function(a) {
      this.enabled &&
        this.isUp &&
        ((this.pointer = a),
        this.motionLock === Phaser.VirtualJoystick.NONE
          ? this.line.end.copyFrom(this.pointer)
          : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
          ? (this.line.end.x = this.pointer.x)
          : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
            (this.line.end.y = this.pointer.y),
        this._showOnTouch
          ? (this.line.start.copyFrom(a),
            (this.posX = a.x),
            (this.posY = a.y),
            (this.visible = !0),
            this.setDown())
          : this.stickHitArea.contains(a.x, a.y) &&
            (this.line.length <= this.deadZone
              ? (this._tracking = !0)
              : (this.setDown(), this.moveStick())));
    },
    checkUp: function(a) {
      a === this.pointer &&
        ((this.pointer = null),
        (this.stickHitArea.x = this.position.x),
        (this.stickHitArea.y = this.position.y),
        (this.stickSprite.x = this.stickHitArea.x),
        (this.stickSprite.y = this.stickHitArea.y),
        this.line.end.copyFrom(this.line.start),
        (this.isDown = !1),
        (this.isUp = !0),
        (this.timeUp = this.pad.game.time.time),
        this.onUp.dispatch(this, a),
        this._showOnTouch && (this.visible = !1));
    },
    setDown: function() {
      (this.isDown = !0),
        (this.isUp = !1),
        (this.timeDown = this.pad.game.time.time),
        (this.timeUp = 0),
        (this._tracking = !1),
        this.checkArea(),
        this.onDown.dispatch(this, this.pointer);
    },
    checkArea: function() {
      (this.angle = this.pad.game.math.radToDeg(this.line.angle)),
        (this.angleFull = this.angle),
        this.angleFull < 0 && (this.angleFull += 360),
        (this.octant = 45 * Math.round(this.angleFull / 45)),
        (this.quadrant =
          this.angleFull >= 45 && this.angleFull < 135
            ? 1
            : this.angleFull >= 135 && this.angleFull < 225
            ? 2
            : this.angleFull >= 225 && this.angleFull < 315
            ? 3
            : 0);
    },
    moveStick: function() {
      this.pointer &&
        (this.isDown || this._tracking) &&
        (this.motionLock === Phaser.VirtualJoystick.NONE
          ? this.line.end.copyFrom(this.pointer)
          : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
          ? (this.line.end.x = this.pointer.x)
          : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
            (this.line.end.y = this.pointer.y),
        this.checkArea(),
        (!this.isDown && this.line.length <= this.deadZone) ||
          (this._tracking && this.setDown(),
          this.line.length < this.baseHitArea.radius
            ? this.motionLock === Phaser.VirtualJoystick.NONE
              ? ((this.stickHitArea.x = this.pointer.x),
                (this.stickHitArea.y = this.pointer.y))
              : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
              ? (this.stickHitArea.x = this.pointer.x)
              : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
                (this.stickHitArea.y = this.pointer.y)
            : (this.baseHitArea.circumferencePoint(
                this.line.angle,
                !1,
                this.limitPoint
              ),
              this.motionLock === Phaser.VirtualJoystick.NONE
                ? ((this.stickHitArea.x = this.limitPoint.x),
                  (this.stickHitArea.y = this.limitPoint.y))
                : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
                ? (this.stickHitArea.x = this.limitPoint.x)
                : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
                  (this.stickHitArea.y = this.limitPoint.y)),
          (this.stickSprite.x = this.stickHitArea.x),
          (this.stickSprite.y = this.stickHitArea.y),
          this.onMove.dispatch(this, this.force, this.forceX, this.forceY)));
    },
    update: function() {
      this.isDown &&
        !this._tracking &&
        this.onUpdate.dispatch(this, this.force, this.forceX, this.forceY);
    },
    alignBottomLeft: function(a) {
      "undefined" == typeof a && (a = 0);
      var b = this.baseSprite.width / 2 + a,
        c = this.baseSprite.height / 2 + a;
      (this.posX = b), (this.posY = this.pad.game.height - c);
    },
    alignBottomRight: function(a) {
      "undefined" == typeof a && (a = 0);
      var b = this.baseSprite.width / 2 + a,
        c = this.baseSprite.height / 2 + a;
      (this.posX = this.pad.game.width - b),
        (this.posY = this.pad.game.height - c);
    },
    destroy: function() {
      this.pad.game.input.onDown.remove(this.checkDown, this),
        this.pad.game.input.onUp.remove(this.checkUp, this);
      for (var a = this.pad.game.input.moveCallbacks, b = 0; b < a.length; b++)
        if (a.callback === this.moveStick && a.context === this) {
          a.splice(b, 1);
          break;
        }
      this.stickSprite.destroy(),
        this.baseSprite.destroy(),
        (this.stickHitArea = null),
        (this.baseHitArea = null),
        (this.line = null),
        (this.limitPoint = null),
        this.onDown.dispose(),
        this.onUp.dispose(),
        this.onMove.dispose(),
        this.onUpdate.dispose(),
        (this.pointer = null),
        (this._scale = null),
        (this.pad = null);
    },
    debug: function(a, b, c) {
      "undefined" == typeof a && (a = !0),
        "undefined" == typeof b && (b = !0),
        "undefined" == typeof c && (c = this.baseSprite.right);
      var d = this.pad.game.debug;
      if (
        (a &&
          ((d.context.lineWidth = 2),
          d.geom(this.baseHitArea, "rgba(255, 0, 0, 1)", !1),
          d.geom(this.stickHitArea, "rgba(0, 255, 0, 1)", !1),
          d.geom(this.line, "rgba(255, 255, 0, 1)"),
          (d.context.lineWidth = 1)),
        b)
      ) {
        var e = d.renderShadow,
          f = c,
          g = this.baseSprite.y - 114;
        (d.renderShadow = !0),
          d.text("Force: " + this.force.toFixed(2), f, g),
          d.text("ForceX: " + this.forceX.toFixed(2), f, g + 24),
          d.text("ForceY: " + this.forceY.toFixed(2), f, g + 48),
          d.text("Rotation: " + this.rotation.toFixed(2), f, g + 96),
          d.text("Angle: " + this.angle.toFixed(2), f, g + 120),
          d.text("Distance: " + this.distance, f, g + 172),
          d.text("Quadrant: " + this.quadrant, f, g + 196),
          d.text("Octant: " + this.octant, f, g + 220),
          (d.renderShadow = e);
      }
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "rotation", {
    get: function() {
      return this.line.angle;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "posX", {
    get: function() {
      return this.position.x;
    },
    set: function(a) {
      this.position.x !== a &&
        ((this.position.x = a),
        (this.baseSprite.x = a),
        (this.stickSprite.x = a),
        (this.baseHitArea.x = a),
        (this.stickHitArea.x = a),
        (this.line.start.x = a),
        (this.line.end.x = a));
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "posY", {
    get: function() {
      return this.position.y;
    },
    set: function(a) {
      this.position.y !== a &&
        ((this.position.y = a),
        (this.baseSprite.y = a),
        (this.stickSprite.y = a),
        (this.baseHitArea.y = a),
        (this.stickHitArea.y = a),
        (this.line.start.y = a),
        (this.line.end.y = a));
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "force", {
    get: function() {
      return Math.min(1, (this.line.length / this.distance) * 2);
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "forceX", {
    get: function() {
      return this.force * this.x;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "forceY", {
    get: function() {
      return this.force * this.y;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "x", {
    get: function() {
      return this.line.angle >= 0
        ? this.line.angle <= 1.5707963267948966
          ? (1.5707963267948966 - this.line.angle) / 1.5707963267948966
          : -1 + ((3.141592653589793 - this.line.angle) / 3.141592653589793) * 2
        : this.line.angle >= -1.5707963267948966
        ? Math.abs(-1.5707963267948966 - this.line.angle) / 1.5707963267948966
        : -1 +
          (Math.abs(-3.141592653589793 - this.line.angle) / 3.141592653589793) *
            2;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "y", {
    get: function() {
      return this.line.angle >= 0
        ? 1 -
            Math.abs(1.5707963267948966 - this.line.angle) / 1.5707963267948966
        : -1 +
            Math.abs(-1.5707963267948966 - this.line.angle) /
              1.5707963267948966;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "filterX", {
    get: function() {
      if (0 === this.x) return 0.5;
      var a = Math.abs(this.forceX) / 2;
      return this.x < 0 ? (0.5 - a).toFixed(2) : (0.5 + a).toFixed(2);
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "filterY", {
    get: function() {
      if (0 === this.y) return 0.5;
      var a = Math.abs(this.forceY) / 2;
      return this.y < 0 ? 1 - (0.5 - a).toFixed(2) : 1 - (0.5 + a).toFixed(2);
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "alpha", {
    get: function() {
      return this.stickSprite.alpha;
    },
    set: function(a) {
      (this.stickSprite.alpha = a), (this.baseSprite.alpha = a);
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "visible", {
    get: function() {
      return this.stickSprite.visible;
    },
    set: function(a) {
      (this.stickSprite.visible = a), (this.baseSprite.visible = a);
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "distance", {
    get: function() {
      return this._distance * this._scale;
    },
    set: function(a) {
      this._distance !== a && (this._distance = a);
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "deadZone", {
    get: function() {
      return this._deadZone * this._scale;
    },
    set: function(a) {
      this._deadZone = a;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "scale", {
    get: function() {
      return this._scale;
    },
    set: function(a) {
      this._scale !== a &&
        (this.stickSprite.scale.set(a),
        this.baseSprite.scale.set(a),
        this.baseHitArea.setTo(
          this.position.x,
          this.position.y,
          this.distance * a
        ),
        this.stickHitArea.setTo(
          this.position.x,
          this.position.y,
          this.stickSprite.width
        ),
        (this._scale = a));
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Stick.prototype, "showOnTouch", {
    get: function() {
      return this._showOnTouch;
    },
    set: function(a) {
      this._showOnTouch !== a &&
        ((this._showOnTouch = a),
        this._showOnTouch && this.visible && (this.visible = !1));
    }
  }),
  (Phaser.VirtualJoystick.Button = function(a, b, c, d, e, f, g) {
    (this.pad = a),
      (this.upFrame = f),
      (this.downFrame = g),
      (this.sprite = this.pad.game.make.sprite(c, d, e, f)),
      this.sprite.anchor.set(0.5),
      b === Phaser.VirtualJoystick.CIRC_BUTTON
        ? (this.hitArea = new Phaser.Circle(
            this.sprite.x,
            this.sprite.y,
            this.sprite.width
          ))
        : b === Phaser.VirtualJoystick.RECT_BUTTON &&
          (this.hitArea = new Phaser.Rectangle(
            this.sprite.x,
            this.sprite.y,
            this.sprite.width,
            this.sprite.height
          )),
      (this.pointer = null),
      (this.enabled = !0),
      (this.isDown = !1),
      (this.isUp = !0),
      (this.onDown = new Phaser.Signal()),
      (this.onUp = new Phaser.Signal()),
      (this.timeDown = 0),
      (this.timeUp = 0),
      (this.repeatRate = 0),
      (this.key = null),
      (this._timeNext = 0),
      (this._scale = 1),
      this.pad.game.stage.addChild(this.sprite),
      this.pad.game.input.onDown.add(this.checkDown, this),
      this.pad.game.input.onUp.add(this.checkUp, this);
  }),
  (Phaser.VirtualJoystick.Button.prototype = {
    addKey: function(a) {
      if (this.key) {
        if (this.key.keyCode === a) return !1;
        this.key.onDown.removeAll(),
          this.key.onUp.removeAll(),
          this.pad.game.input.keyboard.removeKey(this.key),
          (this.key = null);
      }
      return (
        a &&
          ((this.key = this.pad.game.input.keyboard.addKey(a)),
          this.key.onDown.add(this.keyDown, this),
          this.key.onUp.add(this.keyUp, this)),
        this.key
      );
    },
    keyDown: function() {
      this.isDown ||
        ((this.sprite.frameName = this.downFrame),
        (this.isDown = !0),
        (this.isUp = !1),
        (this.timeDown = this.pad.game.time.time),
        (this.timeUp = 0),
        this.onDown.dispatch(this, this.key));
    },
    keyUp: function() {
      this.isDown &&
        ((this.sprite.frameName = this.upFrame),
        (this.isDown = !1),
        (this.isUp = !0),
        (this.timeUp = this.pad.game.time.time),
        this.onUp.dispatch(this, this.key, this.duration));
    },
    checkDown: function(a) {
      this.enabled &&
        this.isUp &&
        this.hitArea.contains(a.x, a.y) &&
        ((this.pointer = a),
        (this.sprite.frameName = this.downFrame),
        (this.isDown = !0),
        (this.isUp = !1),
        (this.timeDown = this.pad.game.time.time),
        (this.timeUp = 0),
        this.onDown.dispatch(this, a));
    },
    checkUp: function(a) {
      a === this.pointer &&
        ((this.pointer = null),
        (this.sprite.frameName = this.upFrame),
        (this.isDown = !1),
        (this.isUp = !0),
        (this.timeUp = this.pad.game.time.time),
        this.onUp.dispatch(this, a, this.duration));
    },
    update: function() {
      this.repeatRate > 0 &&
        this.isDown &&
        this.pad.game.time.time >= this._timeNext &&
        (this.onDown.dispatch(this, this.pointer),
        (this._timeNext = this.pad.game.time.time + this.repeatRate));
    },
    alignBottomLeft: function(a) {
      "undefined" == typeof a && (a = 0);
      var b = this.sprite.width / 2 + a,
        c = this.sprite.height / 2 + a;
      (this.posX = b), (this.posY = this.pad.game.height - c);
    },
    alignBottomRight: function(a) {
      "undefined" == typeof a && (a = 0);
      var b = this.sprite.width / 2 + a,
        c = this.sprite.height / 2 + a;
      (this.posX = this.pad.game.width - b),
        (this.posY = this.pad.game.height - c);
    },
    destroy: function() {
      this.pad.game.input.onDown.remove(this.checkDown, this),
        this.pad.game.input.onUp.remove(this.checkUp, this),
        this.sprite.destroy(),
        this.onDown.dispose(),
        this.onUp.dispose(),
        (this.hitArea = null),
        (this.pointer = null),
        (this._scale = null),
        (this.pad = null);
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "posX", {
    get: function() {
      return this.sprite.x;
    },
    set: function(a) {
      this.sprite.x !== a && ((this.sprite.x = a), (this.hitArea.x = a));
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "posY", {
    get: function() {
      return this.sprite.y;
    },
    set: function(a) {
      this.sprite.y !== a && ((this.sprite.y = a), (this.hitArea.y = a));
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "alpha", {
    get: function() {
      return this.sprite.alpha;
    },
    set: function(a) {
      this.sprite.alpha = a;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "visible", {
    get: function() {
      return this.sprite.visible;
    },
    set: function(a) {
      this.sprite.visible = a;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "scale", {
    get: function() {
      return this._scale;
    },
    set: function(a) {
      this._scale !== a &&
        (this.sprite.scale.set(a),
        this.hitArea.setTo(this.sprite.x, this.sprite.y, this.sprite.width),
        (this._scale = a));
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.Button.prototype, "duration", {
    get: function() {
      return this.isUp
        ? this.timeUp - this.timeDown
        : this.game.time.time - this.timeDown;
    }
  }),
  (Phaser.VirtualJoystick.DPad = function(a, b, c, d, e, f, g, h, i, j) {
    (this.pad = a),
      (this.neutralFrame = f),
      (this.upFrame = g),
      (this.downFrame = h),
      (this.leftFrame = i),
      (this.rightFrame = j),
      (this.position = new Phaser.Point(b, c)),
      (this.line = new Phaser.Line(
        this.position.x,
        this.position.y,
        this.position.x,
        this.position.y
      )),
      (this.sprite = this.pad.game.make.sprite(b, c, e, f)),
      this.sprite.anchor.set(0.5),
      (this.baseHitArea = new Phaser.Circle(
        this.position.x,
        this.position.y,
        d
      )),
      (this.stickHitArea = new Phaser.Circle(
        this.position.x,
        this.position.y,
        this.sprite.width
      )),
      (this.limitPoint = new Phaser.Point()),
      (this.pointer = null),
      (this.enabled = !0),
      (this.isDown = !1),
      (this.isUp = !0),
      (this.onDown = new Phaser.Signal()),
      (this.onUp = new Phaser.Signal()),
      (this.onMove = new Phaser.Signal()),
      (this.onUpdate = new Phaser.Signal()),
      (this.timeDown = 0),
      (this.timeUp = 0),
      (this.angle = 0),
      (this.angleFull = 0),
      (this.quadrant = 0),
      (this.octant = 0),
      (this.direction = Phaser.NONE),
      (this._distance = d),
      (this._deadZone = 0.15 * d),
      (this._scale = 1),
      (this._tracking = !1),
      (this._showOnTouch = !1),
      this.pad.game.stage.addChild(this.sprite),
      this.pad.game.input.onDown.add(this.checkDown, this),
      this.pad.game.input.onUp.add(this.checkUp, this),
      this.pad.game.input.addMoveCallback(this.moveStick, this);
  }),
  (Phaser.VirtualJoystick.DPad.prototype = {
    checkDown: function(a) {
      this.enabled &&
        this.isUp &&
        ((this.pointer = a),
        this.line.end.copyFrom(a),
        this._showOnTouch
          ? (this.line.start.copyFrom(a),
            (this.posX = a.x),
            (this.posY = a.y),
            (this.visible = !0),
            this.setDown())
          : this.stickHitArea.contains(a.x, a.y) &&
            (this.line.length <= this.deadZone
              ? (this._tracking = !0)
              : (this.setDown(), this.moveStick())));
    },
    checkUp: function(a) {
      a === this.pointer &&
        ((this.pointer = null),
        (this.stickHitArea.x = this.position.x),
        (this.stickHitArea.y = this.position.y),
        (this.sprite.frameName = this.neutralFrame),
        this.line.end.copyFrom(this.line.start),
        (this.isDown = !1),
        (this.isUp = !0),
        (this.direction = Phaser.NONE),
        (this.timeUp = this.pad.game.time.time),
        this.onUp.dispatch(this, a),
        this._showOnTouch && (this.visible = !1));
    },
    setDown: function() {
      (this.isDown = !0),
        (this.isUp = !1),
        (this.timeDown = this.pad.game.time.time),
        (this.timeUp = 0),
        (this._tracking = !1),
        this.checkArea(),
        this.onDown.dispatch(this, this.pointer);
    },
    checkArea: function() {
      (this.angle = this.pad.game.math.radToDeg(this.line.angle)),
        (this.angleFull = this.angle),
        this.angleFull < 0 && (this.angleFull += 360),
        (this.octant = 45 * Math.round(this.angleFull / 45)),
        (this.quadrant =
          this.angleFull >= 45 && this.angleFull < 135
            ? 1
            : this.angleFull >= 135 && this.angleFull < 225
            ? 2
            : this.angleFull >= 225 && this.angleFull < 315
            ? 3
            : 0);
    },
    moveStick: function() {
      return this.pointer && (this.isDown || this._tracking)
        ? (this.line.end.copyFrom(this.pointer),
          this.checkArea(),
          !this.isDown && this.line.length <= this.deadZone
            ? ((this.direction = Phaser.NONE),
              void (this.sprite.frameName = this.neutralFrame))
            : (this._tracking && this.setDown(),
              this.line.length < this.baseHitArea.radius
                ? this.motionLock === Phaser.VirtualJoystick.NONE
                  ? ((this.stickHitArea.x = this.pointer.x),
                    (this.stickHitArea.y = this.pointer.y))
                  : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
                  ? (this.stickHitArea.x = this.pointer.x)
                  : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
                    (this.stickHitArea.y = this.pointer.y)
                : (this.baseHitArea.circumferencePoint(
                    this.line.angle,
                    !1,
                    this.limitPoint
                  ),
                  this.motionLock === Phaser.VirtualJoystick.NONE
                    ? ((this.stickHitArea.x = this.limitPoint.x),
                      (this.stickHitArea.y = this.limitPoint.y))
                    : this.motionLock === Phaser.VirtualJoystick.HORIZONTAL
                    ? (this.stickHitArea.x = this.limitPoint.x)
                    : this.motionLock === Phaser.VirtualJoystick.VERTICAL &&
                      (this.stickHitArea.y = this.limitPoint.y)),
              1 === this.quadrant
                ? ((this.sprite.frameName = this.downFrame),
                  (this.direction = Phaser.DOWN))
                : 2 === this.quadrant
                ? ((this.sprite.frameName = this.leftFrame),
                  (this.direction = Phaser.LEFT))
                : 3 === this.quadrant
                ? ((this.sprite.frameName = this.upFrame),
                  (this.direction = Phaser.UP))
                : ((this.sprite.frameName = this.rightFrame),
                  (this.direction = Phaser.RIGHT)),
              void this.onMove.dispatch(this, this.x, this.y)))
        : ((this.direction = Phaser.NONE),
          void (this.sprite.frameName = this.neutralFrame));
    },
    update: function() {
      this.isDown &&
        !this._tracking &&
        this.onUpdate.dispatch(this, this.x, this.y);
    },
    alignBottomLeft: function(a) {
      "undefined" == typeof a && (a = 0);
      var b = this.sprite.width / 2 + a,
        c = this.sprite.height / 2 + a;
      (this.posX = b), (this.posY = this.pad.game.height - c);
    },
    alignBottomRight: function(a) {
      "undefined" == typeof a && (a = 0);
      var b = this.sprite.width / 2 + a,
        c = this.sprite.height / 2 + a;
      (this.posX = this.pad.game.width - b),
        (this.posY = this.pad.game.height - c);
    },
    destroy: function() {
      this.pad.game.input.onDown.remove(this.checkDown, this),
        this.pad.game.input.onUp.remove(this.checkUp, this);
      for (var a = this.pad.game.input.moveCallbacks, b = 0; b < a.length; b++)
        if (a.callback === this.moveStick && a.context === this) {
          a.splice(b, 1);
          break;
        }
      this.sprite.destroy(),
        (this.stickHitArea = null),
        (this.baseHitArea = null),
        (this.line = null),
        (this.limitPoint = null),
        this.onDown.dispose(),
        this.onUp.dispose(),
        (this.pointer = null),
        (this._scale = null),
        (this.pad = null);
    },
    debug: function(a, b, c) {
      "undefined" == typeof a && (a = !0),
        "undefined" == typeof b && (b = !0),
        "undefined" == typeof c && (c = this.sprite.right);
      var d = this.pad.game.debug;
      if (
        (a &&
          ((d.context.lineWidth = 2),
          d.geom(this.baseHitArea, "rgba(255, 0, 0, 1)", !1),
          d.geom(this.stickHitArea, "rgba(0, 255, 0, 1)", !1),
          d.geom(this.line, "rgba(255, 255, 0, 1)"),
          (d.context.lineWidth = 1)),
        b)
      ) {
        var e = d.renderShadow,
          f = c,
          g = this.sprite.y - 48;
        (d.renderShadow = !0),
          d.text("X: " + this.x, f, g),
          d.text("Y: " + this.y, f, g + 24),
          d.text("Distance: " + this.distance, f, g + 48),
          d.text("Quadrant: " + this.quadrant, f, g + 96),
          d.text("Octant: " + this.octant, f, g + 120),
          (d.renderShadow = e);
      }
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "rotation", {
    get: function() {
      return this.line.angle;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "posX", {
    get: function() {
      return this.position.x;
    },
    set: function(a) {
      this.position.x !== a &&
        ((this.position.x = a),
        (this.sprite.x = a),
        (this.baseHitArea.x = a),
        (this.stickHitArea.x = a),
        (this.line.start.x = a),
        (this.line.end.x = a));
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "posY", {
    get: function() {
      return this.position.y;
    },
    set: function(a) {
      this.position.y !== a &&
        ((this.position.y = a),
        (this.sprite.y = a),
        (this.baseHitArea.y = a),
        (this.stickHitArea.y = a),
        (this.line.start.y = a),
        (this.line.end.y = a));
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "x", {
    get: function() {
      return this.direction === Phaser.LEFT
        ? -1
        : this.direction === Phaser.RIGHT
        ? 1
        : 0;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "y", {
    get: function() {
      return this.direction === Phaser.UP
        ? -1
        : this.direction === Phaser.DOWN
        ? 1
        : 0;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "alpha", {
    get: function() {
      return this.sprite.alpha;
    },
    set: function(a) {
      this.sprite.alpha = a;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "visible", {
    get: function() {
      return this.sprite.visible;
    },
    set: function(a) {
      this.sprite.visible = a;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "distance", {
    get: function() {
      return this._distance * this._scale;
    },
    set: function(a) {
      this._distance !== a && (this._distance = a);
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "deadZone", {
    get: function() {
      return this._deadZone * this._scale;
    },
    set: function(a) {
      this._deadZone = a;
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "scale", {
    get: function() {
      return this._scale;
    },
    set: function(a) {
      this._scale !== a &&
        (this.sprite.scale.set(a),
        this.baseHitArea.setTo(
          this.position.x,
          this.position.y,
          this.distance * a
        ),
        this.stickHitArea.setTo(
          this.position.x,
          this.position.y,
          this.sprite.width
        ),
        (this._scale = a));
    }
  }),
  Object.defineProperty(Phaser.VirtualJoystick.DPad.prototype, "showOnTouch", {
    get: function() {
      return this._showOnTouch;
    },
    set: function(a) {
      this._showOnTouch !== a &&
        ((this._showOnTouch = a),
        this._showOnTouch && this.visible && (this.visible = !1));
    }
  });
