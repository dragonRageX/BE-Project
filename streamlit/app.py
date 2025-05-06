import streamlit as st
from utils import fetch_data, load_model, prepare_input, predict
import datetime

st.set_page_config(page_title="📊 TFT Stock Predictor", layout="centered")
st.title("📈 Stock Prediction using Temporal Fusion Transformer")

# Input
ticker = st.text_input("Enter Stock Ticker (e.g., AAPL, MSFT)", value="AAPL")
start_date = st.date_input("Start Date", datetime.date(2020, 1, 1))
end_date = st.date_input("End Date", datetime.date.today())

if st.button("Fetch & Predict"):
    with st.spinner("Fetching data..."):
        df = fetch_data(ticker, start_date, end_date)
        st.success("Data fetched successfully!")
        st.write(df.tail())

        st.subheader("🔄 Running Prediction...")
        model = load_model("model/trained_model.pt")
        prepared = prepare_input(df)
        forecast = predict(model, prepared)

        st.subheader("📊 Prediction Output")
        st.dataframe(forecast)
