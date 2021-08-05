import * as THREE from "three";
import React, { useEffect, useState, useLayoutEffect } from 'react'

export default function Younes() {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x39CBDB });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function init() {
        camera.position.z = 5;
    }

    var animate = function() {
        requestAnimationFrame(animate);
  
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
  
        renderer.render(scene, camera);
      };
  

    useEffect(() => {
        init();
        animate();

        return () => {
        }
    }, []);

    return <div ref={ref => (document = ref)} />;
}