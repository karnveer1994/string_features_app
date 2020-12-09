class Api::V1::MatchRecordsController < ApplicationController
  before_action :authorize_request
  before_action :set_match_record, only: %i[destroy]

  def index
    @match_records = @current_user.match_records

    render json: @match_records
  end

  def create
    @match_record = @current_user.match_records.build(match_record_params)
    if @match_record.save
      render json: @match_record, status: :created
    else
      render json: @match_record.errors, status: :unprocessable_entity
    end
  end

  def destroy
    match_record = @current_user.match_records.find(@match_record.id)
    if match_record
      match_record.destroy
      render json: { status: 'deleted' }
    else
      render json: { status: 'String match not matched with user' }
    end
  end

  private

  def set_match_record
    @match_record = MatchRecord.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: { error: e }
  rescue StandardError => e
    render json: { error: e }
  end

  def match_record_params
    params.require(:match_record).permit(:first_string, :second_string)
  end
end
