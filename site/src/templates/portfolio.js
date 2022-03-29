import React from "react"
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { graphql } from 'gatsby'
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"

export default function Portfolio({ data }) {
  const portfolioData = data.portfoliosJson
  const hypotheticalGrowth = portfolioData.hypotheticalGrowth
  const hypotheticalGrowthOptions = {
    title: {
      text: "10 Year Hypothetical Growth"
    },
    series: hypotheticalGrowth.series
  }
  const returnsKeys = ["type", "ytd", "_1y", "_3y", "_5y", "_10y"]
  const annualizedReturns = {...portfolioData.annualizedReturns, ...{"type": "Annualized Returns"}}
  const totalReturns = {...portfolioData.totalReturns, ...{"type": "Total Returns"}}
  const returnsHeader = {
    "type": "",
    "ytd": "Year to Date",
    "_1y": "1 Year",
    "_3y": "3 Year",
    "_5y": "5 Year",
    "_10y": "10 Year",
  }
  let returnsRows = [returnsHeader, annualizedReturns, totalReturns].map(
    obj => returnsKeys.map(
      key => obj[key]
    )
  )
  return (
    <Layout>
      <div>
        <Title text={portfolioData.name} />
        <h2>Returns</h2>
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={hypotheticalGrowthOptions}
            constructorType = { 'stockChart' }
          />
        </div>
        <table>
          {returnsRows.map(row => <tr>{row.map(el => <td>{el}</td>)}</tr>)}
        </table>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    portfoliosJson(fields: { slug: { eq: $slug } }) {
      hypotheticalGrowth {
        series {
          data
          name
        }
      }
      dailyTimeseries {
        series {
          data
          name
        }
      }
      annualizedReturns {
        _10y
        _1y
        _5y
        _3y
        ytd
      }
      totalReturns {
        _10y
        _1y
        _3y
        _5y
        ytd
      }
      name
    }
  }
`
