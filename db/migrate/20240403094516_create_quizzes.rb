class CreateQuizzes < ActiveRecord::Migration[7.1]
  def change
    create_table :quizzes do |t|
      t.string :question
      t.text :options
      t.integer :correct_answer

      t.timestamps
    end
  end
end
