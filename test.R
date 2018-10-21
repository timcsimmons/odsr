source("ods.R")

foo <- html("test.html")

foo$h1("Header 1")
foo$h2("Header 2")
foo$h3("Header 3")
foo$h4("Header 4")
foo$h5("Header 5")
foo$h6("Header 6")

foo$p("Paragraph")


foo$title("Sine and cosine functions")

x <- seq(0, 2*pi, length=100)
plot(x, sin(x), type="l")
lines(x, cos(x), lty=2)
foo$png()


foo$put("<p>Here is a paragraphic with <strong>emphasis</strong></p>")

foo$h1("Printing data frames")

foo$title("The first six rows of the iris data frame")
iris6 <- iris[1:6, ]
foo$print(iris6)


foo$h1("Printing lm output")
x <- rep(1:10, times=100)
y <- 1 + 2*x + rnorm(length(x))
foo$print(summary(lm(y ~ x))$coefficients)

foo$raw(summary(lm(y ~ x)))


foo$h1("Tabular output")
foo$title("Summary of cars")
t1 <- tabulator(mtcars, ~ cyl + cyl:am)
t1$n()
t1$mean("mpg")
t1$mean("disp")
t1$mean("hp")
t1$mean("drat")
t1$mean("wt")
t1$mean("qsec")
t1$table("vs")
t1$table("gear")
t1$table("carb")
foo$print(t1)
foo$close()