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
    Ship_png : folder + "battleShip.png",
    Sub_Long_png : folder + "SubLong.png",
    Sub_png : folder + "Sub.png",
    Bomb_png : folder + "bomb.png",
    Boom_png: folder + "BOOM.png",
    Bang_sound: "res/sound/Bang.wav"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}