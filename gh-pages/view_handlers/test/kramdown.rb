require 'view_handlers/_layouts/web'

module ViewHandlers::Test

  class Kramdown
    include ViewHandlers::Layouts::Web

    page_title{ 'Kramdown Test Page' }

    def run!
      render 'test/kramdown.html'
    end

  end

end
