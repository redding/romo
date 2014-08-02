require 'view_handlers/_layouts/web'

module ViewHandlers::Test

  class Kramdown
    include ViewHandlers::Layouts::Web

    def run!
      render 'test/kramdown.html'
    end

  end

end
