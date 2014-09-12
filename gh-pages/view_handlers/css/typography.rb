require 'view_handlers/_layouts/docs'

module ViewHandlers; end
module ViewHandlers::CSS

  class Typography
    include ViewHandlers::Layouts::Docs

    page_title{ 'Typography' }

    def run!
      render 'css/typography.html'
    end

  end

end
