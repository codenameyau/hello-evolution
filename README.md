# hello-evolution

The goal is to generate a intial population of random strings and perform
a genetic algorithm to get a member in the population to match a target
string. The algorithm uses weighted fitness and diversity rank selection.

```bash
# Sample Output
------------------------------------------------------------------------
generation | survived | maxFitness | maxDiversity | maxScore | phenotype
------------------------------------------------------------------------
0            88         2            11.9           13.9       *I0b94Wo*9Di
1            41         1            11.9           12.9       Y2&li74Lm=:5
2            39         2            11.8           13.7       IM08H4-oX[&!
3            76         3            11.7           14.4       I.d8H >o{Dl!
4            29         4            11.8           15.2       Ht WoQ-orY.9
5            26         5            11.6           15.8       $M,Wo -or.dA
6            36         5            11.6           15         _Mblo -1rod+
7            43         5            11.4           15         +" <o\Wor.dM
8            32         7            11.1           15.7       H. lo W1f;d!
9            33         8            10.4           15.2       HM+lo 'orsd!
10           58         9            10.1           15.4       HL+lo Wor"d!
11           77         8            10             14.6       H#_lo Worad:
12           62         9            9.8            15         Hx)lo Wor6d!
13           61         9            9.8            15         H"Qlo WorMd!
14           43         9            9.8            15.2       H)Qlo WorMd!
15           47         9            9.4            15.1       Hrglo0World!
16           12         10           9.4            15.3       HvHlo World!
17           93         11           9.1            15.8       HeHlo World!
18           61         10           9.3            16         Heglo 9orld!
19           51         11           9.8            16.2       HeHlo World!
20           74         10           9.6            15.9       Hello0WorBd!
21           74         10           9.4            16.3       Hello0Wor4d!
22           19         10           10.7           16.1       H~llo Workd!
23           74         11           8.5            15.6       H~llo World!
24           36         12           9.6            16.3       Hello World!
```

--

### Findings

**Population size**, **fitness**, and **diversity** rank have the
most significant impact on decreasing the number of generations required
to reach the target fitness. This is because there is a larger
and more diverse gene pool to choose from and a higher chance of mutation
for each potential parent.

This is the sameple trial output for how many generations it takes to reach
the target fitness goal.

```
Target String: "Hello World!"
Population Size: 100

Number of Trials: 50
Mean Generations: 39.4
Standard Deviation: 13.906392598443379
```
