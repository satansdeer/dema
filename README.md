# Interactive Dashboard

[Deployed Preview](https://6630f2aa7421b109243dfd91--golden-cassata-661a71.netlify.app/)

## Running Locally

To run the app - install the dependencies and run the `dev` script:
```shell
yarn && yarn dev
```

## Improvements (If given more time)

- [ ] Add data processing tests
- [ ] Handle api errors
- [ ] Introduce Data Transfer Object types and validation to make sure the app gets valid data
- [ ] Refactor aggregated data calculation (currently calculates data both for the chart and for the table)
- [ ] Implement an abstract function for data processing that would be composed from processing functions passed as arguments. This would use one processing cycle to data for various dashboard elements.

