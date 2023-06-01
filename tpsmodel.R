install.packages("ggplot2")
install.packages("dplyr")
install.packages("broom")
install.packages("ggpubr")

##loading the packages
library(ggplot2)
library(dplyr)
library(broom)
library(ggpubr)
library(readr)

## Importing TPS Data ----

data = read_csv("tpsdata.csv")

summary(data)
hist(data$tpsresult)
plot(tpsresult ~ txrate, data=data)

tpsresult.lm <- lm(tpsresult ~ txrate, data = data)

summary(tpsresult.lm)


par(mfrow=c(2,2))
plot(tpsresult.lm)
par(mfrow=c(1,1))

txrate.graph<-ggplot(data, aes(x=txrate, y=tpsresult))+
  geom_point()
txrate.graph
txrate.graph <- txrate.graph + geom_smooth(method="lm", col="black")
txrate.graph
txrate.graph <- txrate.graph +
  stat_regline_equation(label.x = 3, label.y = 7)

txrate.graph
txrate.graph +
  theme_bw() +
  labs(title = "Summary of model showing the transaction rate and the throughput",
       x = "Transaction Rate ()",
       y = "TPS")

heart.plot

heart.plot <- heart.plot +
  geom_line(data=plotting.data, aes(x=txrate, y=predicted.y, color=txload), size=1.25)

heart.plot


