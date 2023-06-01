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

## Importing LATENCY Data ----

data = read_csv("latency.csv")

summary(data)
hist(data$latencyresult)
plot(latencyresult ~ txrate, data=data)

latencyresult.lm <- lm(latencyresult ~ txrate, data = data)

summary(latencyresult.lm)


par(mfrow=c(2,2))
plot(tpsresult.lm)
par(mfrow=c(1,1))

txrate.graph<-ggplot(data, aes(x=txrate, y=latencyresult))+
  geom_point()
txrate.graph
txrate.graph <- txrate.graph + geom_smooth(method="lm", col="black")
txrate.graph
txrate.graph <- txrate.graph +
  stat_regline_equation(label.x = 3, label.y = 7)

txrate.graph
txrate.graph +
  theme_bw() +
  labs(title = "Summary of model showing the transaction rate and the average latency",
       x = "Average Latency ()",
       y = "TPS")



heart.plot

heart.plot <- heart.plot +
  geom_line(data=plotting.data, aes(x=txrate, y=predicted.y, color=txload), size=1.25)

heart.plot


