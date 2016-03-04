# hello-evolution
String matching evolutionary algorithms

```bash
# Sample Output
@yau@YAU-PC (05:59 PM) src (master) $ node main.js

------------------------------------------------------------------------
generation | survived | maxFitness | maxDiversity | maxScore | phenotype
------------------------------------------------------------------------
0            44         1            5              6          H^aqb
1            31         2            5              6.9        H=aqo
2            94         2            4.9            6.7        HO|lV
3            85         2            4.9            6.8        +euRo
4            79         2            5              6.7        Ialho
5            42         3            4.9            7.5        Hal{o
6            45         3            5              7.3        PYllo
7            93         3            4.9            7.1        He|8o
8            74         3            4.9            7          HN[lo
9            26         4            4.9            7.5        HelRo
10           42         5            4.8            7.7        Hello
```

--

### Findings

Population size has a huge impact on decreasing the number of generations
required to reach the targetted fitness. This is because there is a larger
and more diverse gene pool to choose from and a higher chance of mutation
for each potential parent.

This is the sameple trial output for how many generations it takes to reach
the target fitness goal.

```
Target String: "Hello World!"
Population Size: 100

Number of Trials: 500
Mean Generations: 74.604
Standard Deviation: 31.876439556474867
```
