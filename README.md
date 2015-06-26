# BigDataInFinance
Analyze big finance data retrieved from bloomberg API

## Requirement
1. Used only the traded quantities and their corresponding prices. We did not consider any quote.
2. For intraday day, we combined trading quantities into each 15min interval according to the timestamp of each trade.
3. For the quantity of each 15 min interval, we summed up corresponding quantity for each trading day from 5/1/12 to 5/20/12, and then calculated the average for each time interval by dividing the sum by the number of trading dates, shown in the following table.
4. For the execution prices, we used the trading prices on 5/21/12. We assumed the price of 1st trade in each time interval as the execution price for the entire interval, shown in the following table.
Save your results in outputs.csv file.

## My solution
1. The data is big(2G) so I use stream in Node.js to manipulate the finace data and save to output.csv file.
2. Use fast-csv package to read data from .csv file.
