import yfinance as yf
import pandas as pd
import torch

def fetch_data(ticker, start_date, end_date):
    df = yf.download(ticker, start=start_date, end=end_date)
    df.reset_index(inplace=True)
    return df

def load_model(model_path):
    return torch.load(model_path, map_location=torch.device('cpu'))

def prepare_input(df):
    # Placeholder – you'll need to match preprocessing from your notebook
    # e.g., TimeSeriesDataSet creation, normalization, etc.
    return df

def predict(model, data):
    # Placeholder – you’ll use model.predict(data_loader)
    return pd.DataFrame({"Placeholder": [1, 2, 3]})  # Replace with actual predictions
