<img src="https://github.com/Art-Finers/GGH-3/blob/main/samply.png" alt="Samply">

 [![Profile][title-img]][profile]

[title-img]:https://img.shields.io/badge/-ART--FINEURS-yellow
[profile]:https://github.com/Art-Finers


<img src="https://github.com/Art-Finers/GGH-3/blob/main/ggh.png" align="right" alt="GGH" width="180" height="180">

This repository contains the work of the **ART-FINEURS** team for the [GottaGoHack](https://www.gottagohack.fr/) #3 Hackathon.


## Objectives

The **Art** reflects the world around us: it bears witness to the evolution of our societies and our ways of life. For 30 years now, **computers** have become more and more important in our lives until it has an impact on everything, even on art. 

The subject `Art Reinvented by Technology` allows you to push your creativity through three main axes :

* e-Art
* Art everywhere, All the time
* What is an artist ?

---

## Our Solution

Samply is a Music sample bank and platform based on [Massa's blockchain](https://massa.net/) technology.

The objective is to create a **transparent** and **decentralized** ecosystem that would allow the various actors in the world of music to be able to be remunerated correctly and fairly for their work.

<img src="https://github.com/Art-Finers/GGH-3/blob/main/Samply_presentation.png" alt="Presentation">

---

## Architecture

Our repository for the project has the following architecture:

```
* frontend : Contains the react application that runs our frontend and which is connected to the Massa's blockchain

* smart-contract : Contains the implementation of our smart contracts on the blockchain, precisely to store and get our samples in the different blocks

* samples : Few examples of music samples on the repository

* ggh.png and samply.png : Various logo used in the README

* README.md
```

---

## Business Canva

<img src="https://github.com/Art-Finers/GGH-3/blob/main/Business_Canva.png" alt="Business Canva">

---

## Plugin Mockup

Here is a **mockup** for the plugin, it is available more precisely in [this](https://www.figma.com/file/5fD7WUlPl4NTkGBgKB3Eyp/plugin?node-id=0%3A1&t=I4ee0qfRLHHGaGAG-1
) link !

<img src="https://github.com/Art-Finers/GGH-3/blob/main/plugin.png" alt="Plugin Mockup">


---

## Usage

Samply is currently not available online as it is **Work In Progress**. 

As the smart contracts are already deployed in the **TestNet** of the Massa's Blockchain, you can simply run and access the current Proof of Concept with the following commands :

```bash
cd frontend
npm i
npm run build
```
