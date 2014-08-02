require 'view_handlers/_layouts/web'

module ViewHandlers::Test

  class Index
    include ViewHandlers::Layouts::Web

    def run!
      render 'test/index.html'
    end

  end

end
