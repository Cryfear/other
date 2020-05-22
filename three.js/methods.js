// ___________________ РЕНДЕРИНГ ___________________

let renders = new THREE.WebGLRenderer({
  canvas: canvas, // куда выводим изображение
  antialias: true, // применять ли сглаживание
  alpha: true, // прозрачность
  transparent: true, // абсолютная прозрачность
  premultipleAlpha: false // преумножение прозрачности, чтобы при совмещении двух прозрачных обьектов лучше показывались
});

renders.setSize(width, height); // размер рендеринга
renders.setPixelRatio(window.devicePixelRatio); // пропорции
renders.setClearColor(0x000000); // цвет общего пространства
renders.ShadowMap.enabled = true; // показ теней
renders.ShadowMap.type = 0; // качество теней, 0 - зазубренные, начальная тень, 1 - высокий уровень, со сглаживанием, 2 - как 1, но чуть хуже
renders.outputEncoding = THREE.sRGBEncoding;

// ______________________ СВЕТ _________________________

let scene = new THREE.Scene(); // сделали пустую сцену
scene.add(new THREE.AxesHelper(100)); // добавление осей, длинною 100 пикселей

let light = new THREE.AmbientLight(
  0xffffff, // цвет
  2.2 // усиление света
); // цвет света, со всех сторон
scene.add(light);
scene.fog = new THREE.Fog(0xffffff, 700, 3000); // цвет тумана, начало и конец

let sun = new THREE.DirectionalLight(0xffffff, 1.2); // цвет и сила его, светит в центр 0 0 0
sun.position.set(400, 450, 500); // позиция света
sun.castShadow = true; // отбрасывание теней от обьектов
sun.shadow.mapSize.width = 4096; // размеры теней света
sun.shadow.mapSize.height = 4096; // размеры теней света
sun.shadow.camera.near = 100; // дальность камеры теней начало
sun.shadow.camera.far = 100; // дальность камеры теней конец
sun.shadow.camera.left = 2000; // макс расстояние обьекта с тенью слева
sun.shadow.camera.rigth = 2000; // макс расстояние обьекта с тенью справа
sun.shadow.camera.top = 2000; // макс расстояние обьекта с тенью сверху
sun.shadow.camera.bottom = 2000; // макс расстояние обьекта с тенью снизу
sun.shadow.radius = 1; // радиус тени
scene.add(new THREE.DirectionalLightHelper(sun, 100));

let pointLight = new THREE.pointLight(0xffffff, 2, 800); // видоизменение текстур на ходу цвет, сила, рассеивание с расстоянием
scene.add(pointLight);
pointLight.add(new THREE.pointLightHelper(pointLight, 10)); // размер света

// ___________________ ЗАГРУЗЧИК ____________________

let manager_to_load = 0; // сколько надо загрузить через менеджер загрузок
let manager_loaded = 0; // загружено в менеджере
let other_to_load = 0; // сколько надо загрузить напрямую остальных файлов
let other_loaded = 0; // загружено напрямую

let loadingManager = new THREE.LoadingManager(); // загрузчик трижс
loadingManager.onProgress = function(item, loaded, total) {
  // при прогрессе загрузки
  console.log(item, loaded, total);
  manager_loaded = loaded;
  if ((loaded = total)) {
    console.log("Файлы в менеджере загружены");
  }
};

// __________________ ЗВУКИ ______________________

let sound = [];
let sound_file = [];

let listener = new THREE.AudioListener(); // для работы музыки у слушателя
listener.context.resume(); // для обхода бага
camera.add(listener); // слушателя привязываем к камере
let audioLoader = new THREE.AudioLoader(); // загрузка самой музыки

audioLoader.load("file.mp3", function(buffer) {
  // buffer = сама музыка
  sound_file["myst"] = buffer;
  other_loaded++;
});
other_to_load++;

// ________________ ТЕКСТУРЫ _____________________

let maxAnisotropy = renderer.capabilities.getMaxAnisotropy(); // четкость изображения

let tex = []; // массив где будут храниться текстуры
let texture_loader = new THREE.TextureLoader(loadingManager);

// ___________

let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000); // угл обзора по вертикали, соотношение, расстояние откуда видно и до куда
camera.position.set(0, 0, 1000); // x, y, z
camera.lookAt(position) // смотреть куда либо

let controls = new THREE.firstPersonControls(camera, renderer.domElement); // какой камерой управлять, на чем отображать, firstPC - от первого лица
controls.movementSpeed = 100; // скорость
controls.lookSpeed = 0.1; // скорость поворота
controls.lookVertical = true; // возможность смотреть вертикально (вверх, вниз)

// ___________________ фигуры, материалы ___________________

let line_geometry = new THREE.Geometry(); // создаем собственную фигуру
line_geometry.vertices.push(new THREE.Vector3(0, 0, 0)); // начальная точка
line_geometry.vertices.push(new THREE.Vector3(0, 40, 0)); // продолжение
line_geometry.vertices.push(new THREE.Vector3(30, 40, 0)); // продолжение

let material_line = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 10,
  opacity: 0
});
line = new THREE.Line(line_geometry, material_line);

let geometry = new THREE.PlaneGeometry(300, 300, 12, 12); // плоскость, ширина высота и кол-во фрагментов
let geometry = new THREE.Geometry();
let material = new THREE.ParticleBasicMaterial({size: 1, sizeAttenuation: false});
let geo_mat;
for(let i = 0; i < 5000; i++) {
  let vertex = new THREE.Vector3();
  vertex.x = Math.random()*2-1;
  vertex.y = Math.random()*2-1;
  vertex.z = Math.random()*2-1;
  geometry.vertices.push(vertex);
}
let geometry = new THREE.BoxGeometry(20, 20, 20); // куб, ширина высота глубина
let geometry = new THREE.CubeGeometry(100, 100, 100, 7, 7, 7); // куб, ширина высота глубина кол-во сигментов
let geometry = new THREE.SphereGeometry(20, 64, 64); // сфера, radius, widthSegments и heightSegments
let geometry = new THREE.ConeBufferGeometry(5, 20, 32); // конус, radius, widthSegments и radialSegments
let material = new THREE.CylinderGeometry(50, 50, 200);
let material = new THREE.MeshBasicMaterial({
  // цвет, true с гранями, false без, только ребра, видно внутренности
  color: 0x00ff00,
  wireframe: true, // if work with faceColors then off this
  vertexColors: THREE.FaceColors, // возможность задавать для каждого фрагмента свой цвет
  map: texture,
  overdraw: true // перерисование на другие грани
});
let material = new THREE.MeshLambertMaterial({
  map: tex["terrain"], // idk
  flatShading: true // сглаживание
});
let material = new THREE.MeshNormalMaterial({
  color: 0xdd22ff
});

let group = new THREE.Object3D(); // чтобы добавлять сюда коллекцию обьектов
group.add(geometry);
scene.add(group);

let texture, loader; // текстуру загружать только после подготовки геометрии и материала
texture = new THREE.Texture();
loader = new THREE.ImageLoader();

loader.addEventListener("load", function(event) {
  texture.image = event.content;
  texture.needsUpdate = true;
});

loader.load("texture.jpg");

for (let i = 0; i < geometry.faces.length; i++) {
  geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random()); // для каждого фрагмента задаем цвет в rgb
}

let mesh = new THREE.Mesh(geometry, material); // передается фигура и материал
scene.add(mesh); // добавляем меш на сцену

requestAnimationFrame(function() {
  renders.render(scene, camera); // зарендерить картинку
  mesh.rotation.y += Math.PI / 1000; // вращать по кругу с определенной скоростью
  mesh.position.y += 1; // менять местоположение в пикселях
  loop();
});
