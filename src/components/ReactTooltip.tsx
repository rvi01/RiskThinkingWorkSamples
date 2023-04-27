import ReactTooltip from 'react-tooltip';
<ReactTooltip id="my-tooltip" type="light" effect="float">
  <p>Asset: {payload[0]?.payload.asset}</p>
  <p>Risk Rating: {payload[0]?.payload.rating}</p>
  <p>Risk Factors: {payload[0]?.payload.factors}</p>
  <p>Year: {payload[0]?.payload.year}</p>
</ReactTooltip>
