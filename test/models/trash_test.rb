require "test_helper"

class TrashTest < ActiveSupport::TestCase

    def setup
        @trash = Trash.new({longitude: -75.160834,latitude: 39.931790, category: "furniture", title: "Modern Chair", isHeavy: false, description: "Chair on broad and south in pretty good condition."})
        @first = Trash.first
    end

    test "valid trash successfully created" do
        assert @trash.valid?
    end

    test "should not save trash without title" do
        @trash.title = nil
        refute @trash.valid?, "Saved trash without title"
        assert_not_nil @trash.errors[:title], "No validation error for no title found"
    end

    test "should not save without longitude" do 
        @trash.longitude = nil
        refute @trash.valid?, "Saved trash without longitude"
        assert_not_nil @trash.errors[:longitude], "No validation error for no longitude found"
    end

    test "should not save trash without latitude" do
        @trash.latitude = nil
        refute @trash.valid?, "Saved trash without latitude"
        assert_not_nil @trash.errors[:latitude], "No validation error for no latitude found"
    end

    # test "#trash_notification" do
    #     assert_equal ({id: @first.id, type: "trash"}), @first.trash_notification
    # end

end