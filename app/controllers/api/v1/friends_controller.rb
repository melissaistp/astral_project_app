class Api::V1::FriendsController < ApplicationController
  def index
    friend = Friend.all.order(created_at: :desc)
    render json: friend
  end

  def create
    friend = Friend.create!(friend_params)
    if friend
      render json: friend
    else
      render json: friend.errors
    end
  end

  def show
    if friend
      render json: friend
    else
      render json: friend.errors
    end
  end

  def destroy
    friend&.destroy
    render json: { message: 'Connection ended!' }
  end

  private

  def friend_params
    params.permit(:alias, :sign, :likeability, :experience, :message, :instruction, :image)
  end

  def friend
    @friend ||= Friend.find(params[:id])
  end
end