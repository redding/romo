require 'view_handlers/_layouts/web'

module ViewHandlers

  class Index
    include ViewHandlers::Layouts::Web

    def run!
      render 'index.html'
    end

  end

end
