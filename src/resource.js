var folder = "";

if (!cc.sys.isNative)
{
    folder = "res/medium/";
}


var res = {
    HelloWorld_png :folder + "HelloWorld.png",
    CloseNormal_png : folder + "CloseNormal.png",
    CloseSelected_png : folder + "CloseSelected.png",
    Background_png : folder + "SubBackground.png",
    Ship_png : folder + "Ship.png",
    Ship_icon_png : folder + "ShipIcon.png",
    Ship_hurt_png : folder + "ShipHurt.png",
    Ship_hurt_more_png : folder + "ShipHurtMore.png",
    Ship_sink_png : folder + "ShipSink.png",    
    Sub_Long_png : folder + "SubLong.png",
    Sub_png : folder + "Sub.png",
    Bomb_png : folder + "bomb.png",
    Boom_png: folder + "BANG.png",
    Bang_sound: "res/sound/Bang.wav",
    Torpedo_png: folder + "torpedo.png",
    Torpedo_Big_png: folder + "torpedoBig.png",
    care_png: folder + "care.png",
    ammo_package_png: folder + "ammoPackage.png",
    health_package_png: folder + "healthPackage.png",
    smoke: folder +"smoke.png",
    AirPlane: folder +"AirPlane.png",
    Settings: folder +"Cog.png",
    Arrow: folder +"Arrow.png",
    ShipSink: "res/sound/ShipSink.wav",
    ShipBoom: "res/sound/shipBoom.wav",
    ShipShoot: "res/sound/shipShoot.wav",
    GameMusic: "res/sound/backgroundMusic(silence).wav",
    NoAmmo: "res/sound/noAmmo.wav",
    SFXon: folder + "SFX.png",
    SFXoff: folder + "noSFX.png",
    InstructionsIcon: folder + "Instructions.png",
    Stats: folder + "Stats.png",
    Missions: folder + "bombMissions.png",
    Accomplished: folder + "Accomplished.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}