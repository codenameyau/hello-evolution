# hello-evolution
String matching evolutionary algorithms

Trials
```bash
yau@YAU-PC (02:16 AM) src (master) $ node main.js
Target String: "Hello World!"
Population Size: 100

Number of Trials: 50
Mean Generations: 81.28
Standard Deviation: 32.7781908579221
```

Sample Output.
```bash
yau@YAU-PC (02:18 AM) src (master) $ node main.js
Generation: 0 | Max Fitness: 2 | Phenotype: "\y.Kow$ol\>d"
Generation: 1 | Max Fitness: 3 | Phenotype: "#El*oFk;Ie3!"
Generation: 2 | Max Fitness: 3 | Phenotype: ",e.l>/&oIY{d"
Generation: 3 | Max Fitness: 4 | Phenotype: "uelhLwW'x"u!"
Generation: 4 | Max Fitness: 7 | Phenotype: "|elDs worli!"
Generation: 5 | Max Fitness: 7 | Phenotype: "<elzo WoOmc!"
Generation: 6 | Max Fitness: 8 | Phenotype: ""ellu Wokmd!"
Generation: 7 | Max Fitness: 7 | Phenotype: ""ellsJkormd!"
Generation: 8 | Max Fitness: 7 | Phenotype: "|el.o W\ md!"
Generation: 9 | Max Fitness: 8 | Phenotype: "Helao WoHPX!"
Generation: 10 | Max Fitness: 8 | Phenotype: "|ello G@sld!"
Generation: 11 | Max Fitness: 10 | Phenotype: "^ello Worls!"
Generation: 12 | Max Fitness: 10 | Phenotype: "^el-o World!"
Generation: 13 | Max Fitness: 10 | Phenotype: "^ello Worldq"
Generation: 14 | Max Fitness: 10 | Phenotype: "|ello Wor)d!"
Generation: 15 | Max Fitness: 11 | Phenotype: "Hello Woxld!"
Generation: 16 | Max Fitness: 11 | Phenotype: "Hello Woxld!"
Generation: 17 | Max Fitness: 11 | Phenotype: "Hello Sorld!"
Generation: 18 | Max Fitness: 12 | Phenotype: "Hello World!"
```

### Findings

Population size has a huge impact on decreasing the number of generations
required to reach the targetted fitness. This is because there is a larger
and more diverse gene pool to choose from and a higher chance of mutation
for each potential parent.
